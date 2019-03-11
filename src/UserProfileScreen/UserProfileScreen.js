import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native"
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

export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { sex: "Nam" }
  }

  componentWillMount = () => {}

  componentDidMount = () => {}

  render() {
    return (
      <ScrollView style={styles.profileContainer}>
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.btnImage}>
            <FontAwesome5 size={60} color={"white"} name={"user"} />
          </TouchableOpacity>
          <Text style={styles.name}>{"Nguyen Minh Hieu"}</Text>
        </View>
        <Item label={"Name display"} value={"Nguyen Minh Hieu"} />
        <Item label={"Tel"} value={"0706216519"} />
        <Item label={"DOB"} value={"25/09/1997"} />
        <Item
          label={"Address"}
          value={
            "226, duong 48, khu pho 6, phuong Hiep Binh Chanh, quan Thu Duc, TP HCM"
          }
          multiline={true}
        />
        <Item label={"Occupations"} value={"Developer"} />

        <View style={styles.sexContainer}>
          <ItemSex
            label={"Nam"}
            sex={this.state.sex}
            borderBottomLeftRadius={5}
            borderTopLeftRadius={5}
          />
          <ItemSex label={"Nu"} sex={this.state.sex} />
          <ItemSex
            label={"Khac"}
            sex={this.state.sex}
            borderBottomRightRadius={5}
            borderTopRightRadius={5}
          />
        </View>

        <TouchableOpacity style={styles.updateContainer}>
          <Text style={styles.updateLabel}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    )
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
  updateLabel: { color: "white", fontSize: 20 }
})
