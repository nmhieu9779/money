import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage,
  DatePickerAndroid,
  ScrollView,
  Image
} from "react-native"
import firebase from "../../Firebase"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import ImagePicker from "react-native-image-picker"
import Spinner from "../Component/LoadingHud"

function Item(props) {
  return (
    <View style={styles.itemContainer}>
      <Text>{props.label}</Text>
      <TextInput
        style={styles.itemInput}
        value={props.value}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
      />
    </View>
  )
}

function ItemSex(props) {
  getColorBackground = () => (props.sex === props.label ? "blue" : "white")
  getColorLabel = () => (props.sex === props.label ? "white" : "black")
  return (
    <Text
      style={[
        styles.itemSex,
        {
          borderBottomRightRadius: props.borderBottomRightRadius,
          borderTopRightRadius: props.borderTopRightRadius,
          borderBottomLeftRadius: props.borderBottomLeftRadius,
          borderTopLeftRadius: props.borderTopLeftRadius,
          backgroundColor: this.getColorBackground(),
          color: this.getColorLabel()
        }
      ]}
      onPress={props.onPress}
    >
      {props.label}
    </Text>
  )
}

defaultState = {
  nameDisplay: "",
  tel: "",
  dob: "",
  address: "",
  occupations: "",
  sex: "Male",
  avatar: ""
}

export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.setState({ data: defaultState, change: false, showHud: true })
    this.getData()
  }

  componentDidMount = () => {}

  getData = async () => {
    const uid = await AsyncStorage.getItem("uid")
    await this.setState({ uid: uid })
    await this.props.onGetUserProfile(uid)
  }
  componentDidUpdate = prevProps => {
    if (prevProps.data != this.props.data) {
      this.setState({ data: this.props.data, showHud: false })
    }
  }

  async renderDatePicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    })
    if (action === DatePickerAndroid.dateSetAction) {
      if (month < 9) {
        this.setState({
          data: { ...this.state.data, dob: `${day}/0${month + 1}/${year}` }
        })
      } else {
        this.setState({
          data: { ...this.state.data, dob: `${day}/${month + 1}/${year}` }
        })
      }
    }
  }

  showHud = showHud => {
    if (showHud) {
      return (
        <Spinner
          visible={showHud}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      )
    }
    return null
  }

  render() {
    let state = this.state.data
    return (
      <ScrollView style={styles.profileContainer}>
        {this.showHud(this.state.showHud)}
        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.btnImage}
            onPress={this.selectPhotoTapped.bind(this)}
          >
            {this.getAvatar()}
          </TouchableOpacity>
          <Text style={styles.name}>{state.nameDisplay}</Text>
        </View>
        <Item
          label={"Name display"}
          value={state.nameDisplay}
          onChangeText={text => this.setDataItem({ nameDisplay: text })}
        />
        <Item
          label={"Tel"}
          value={state.tel}
          onChangeText={text => this.setDataItem({ tel: text })}
          keyboardType={"numeric"}
        />
        <View style={styles.itemContainer}>
          <Text>{"DOB"}</Text>
          <Text
            style={[styles.itemInput, { color: "black" }]}
            onPress={this.onPressChooseDOB.bind(this)}
          >
            {state.dob}
          </Text>
        </View>
        <Item
          label={"Address"}
          value={state.address}
          onChangeText={text => this.setDataItem({ address: text })}
          multiline={true}
        />
        <Item
          label={"Occupations"}
          value={state.occupations}
          onChangeText={text => this.setDataItem({ occupations: text })}
        />

        <View style={styles.sexContainer}>
          <ItemSex
            label={"Male"}
            sex={state.sex}
            borderBottomLeftRadius={5}
            borderTopLeftRadius={5}
            onPress={() =>
              this.setState({ data: { ...this.state.data, sex: "Male" } })
            }
          />
          <ItemSex
            label={"Female"}
            sex={state.sex}
            onPress={() =>
              this.setState({ data: { ...this.state.data, sex: "Female" } })
            }
          />
          <ItemSex
            label={"Other"}
            sex={state.sex}
            borderBottomRightRadius={5}
            borderTopRightRadius={5}
            onPress={() =>
              this.setState({ data: { ...this.state.data, sex: "Other" } })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.updateContainer}
          onPress={this.onPressUpdate.bind(this)}
        >
          <Text style={styles.updateLabel}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
  setDataItem = item => this.setState({ data: { ...this.state.data, ...item } })
  onPressUpdate = async () => {
    await this.setState({ showHud: true })
    await this.props.onSetUserProfile(this.state)
    await this.setState({ change: false })
  }
  onPressChooseDOB = () => {
    this.renderDatePicker()
  }
  getAvatar = () => {
    if (!!this.state.data.avatar) {
      let uri = this.state.data.avatar
      return <Image style={styles.avatar} source={{ uri: uri }} />
    } else {
      return <FontAwesome5 size={60} color={"white"} name={"user"} />
    }
  }
  selectPhotoTapped() {
    let me = this
    const options = {
      title: "Select Avatar"
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
      } else {
        me.handleResponse(response)
      }
    })
  }

  handleResponse = async response => {
    this.setState({
      data: { ...this.state.data, avatar: response.uri },
      change: true
    })
  }
}

const styles = StyleSheet.create({
  profileContainer: {},
  itemContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10
  },
  itemInput: { borderBottomColor: "gray", borderBottomWidth: 0.5, padding: 0 },
  infoContainer: {
    backgroundColor: "#329BFF",
    justifyContent: "center",
    alignItems: "center",
    height: 200
  },
  btnImage: {
    width: 100,
    height: 100,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  name: { color: "white", fontWeight: "bold", fontSize: 20 },
  sexContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: 10
  },
  itemSex: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#ccc",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  updateContainer: {
    marginTop: 20,
    margin: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#329BFF"
  },
  updateLabel: { color: "white", fontSize: 20 },
  avatar: { width: "100%", height: "100%", borderRadius: 999 }
})
