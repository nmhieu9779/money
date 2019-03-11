import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage
} from "react-native"
import firebase from "../../Firebase"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { ScrollView } from "react-native-gesture-handler"

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
  sex: "Male"
}

export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    this.setState({ data: defaultState })
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    let me = this
    const uid = await AsyncStorage.getItem("uid")
    await this.setState({ uid: uid })
    await firebase
      .firestore()
      .collection("profile")
      .doc(this.state.uid)
      .get()
      .then(function(querySnapshot) {
        me.setState({ data: querySnapshot.data() })
      })
      .catch(error => console.log(error))
  }

  render() {
    let state = this.state.data
    console.log(this.state)
    return (
      <ScrollView style={styles.profileContainer}>
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.btnImage}>
            <FontAwesome5 size={60} color={"white"} name={"user"} />
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
        <Item
          label={"DOB"}
          value={state.dob}
          onChangeText={text => this.setDataItem({ dob: text })}
        />
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
        <TouchableOpacity style={styles.updateContainer}>
          <Text style={styles.updateLabel}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  setDataItem = item => this.setState({ data: { ...this.state.data, ...item } })
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
  updateLabel: { color: "white", fontSize: 20 }
})
