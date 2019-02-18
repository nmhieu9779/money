import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

defaultState = {
  iconName: "",
  categoryName: ""
}
export default class AddCategoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { iconName: "", categoryName: "" }
  }
  render() {
    var { visible } = this.props
    var { iconName, categoryName } = this.state
    return (
      <Modal
        presentationStyle={"overFullScreen"}
        visible={visible}
        animationType={"fade"}
        onRequestClose={() => {}}
        onShow={() => this.setState(defaultState)}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add expense category</Text>
          <FontAwesome5
            onPress={this.props.onPressClose}
            style={[styles.btnClose, styles.icon]}
            size={30}
            name={"times"}
          />
        </View>
        <View style={[styles.container, styles.borderContainer]}>
          <View style={styles.iconContainer}>
            <FontAwesome5 style={styles.icon} size={20} name={iconName} />
          </View>
          <TextInput
            style={styles.input}
            placeholderTextColor={"#ccc"}
            placeholder={"Category icon name"}
            value={iconName}
            onChangeText={text => this.setState({ iconName: text })}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <FontAwesome5 style={styles.icon} size={20} name={"box-open"} />
          </View>
          <TextInput
            style={styles.input}
            placeholderTextColor={"#ccc"}
            placeholder={"Category name"}
            value={categoryName}
            onChangeText={text => this.setState({ categoryName: text })}
          />
        </View>
        <TouchableOpacity style={styles.btnSaveContainer}>
          <FontAwesome5
            style={[styles.btnIconSave, styles.icon]}
            size={20}
            name={"save"}
            onPress={this.onPressSave.bind(this)}
          />
          <Text style={styles.btnLabelSave}>Save</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
  onPressSave = () => {
    let { iconName, categoryName } = this.state
  }
}

const styles = StyleSheet.create({
  addCategoryScreenContainer: {
    height: "80%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    height: 50,
    backgroundColor: "#329BFF",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  title: {
    flex: 1,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    paddingLeft: 60,
    paddingRight: 30
  },
  btnClose: {
    textAlignVertical: "center",
    padding: 5,
    width: 30,
    textAlign: "center"
  },
  iconContainer: {
    backgroundColor: "#000",
    borderRadius: 999,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    paddingBottom: 5
  },
  borderContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc"
  },
  input: {
    flex: 1
  },
  btnSaveContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginLeft: "10%",
    backgroundColor: "#329BFF",
    height: 35,
    borderRadius: 5
  },
  btnIconSave: {
    marginRight: 5
  },
  btnLabelSave: {
    color: "white",
    fontWeight: "bold"
  },
  icon: {
    color: "white"
  }
})
