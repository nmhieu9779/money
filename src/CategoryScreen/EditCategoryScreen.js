import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Picker,
  Alert
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import firebase from "../../Firebase"

export default class EditCategoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iconName: "",
      categoryName: "",
      parentCategory: ""
    }
  }
  render() {
    var { editCategory, visible, listParentCategory } = this.props
    var { iconName, categoryName, parentCategory } = this.state
    return (
      <Modal
        presentationStyle={"overFullScreen"}
        visible={visible}
        animationType={"fade"}
        onRequestClose={() => {}}
        onShow={() =>
          this.setState({
            iconName: editCategory.item.icon,
            categoryName: editCategory.item.name,
            parentCategory: editCategory.key
          })
        }
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit expense category</Text>
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
            onChangeText={text =>
              this.setState({ iconName: text.toLowerCase() })
            }
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
        <View style={styles.pickerContainer}>
          <Text>Select Parent Category</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={parentCategory}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ parentCategory: itemValue })
            }
          >
            <Picker.Item label={"Select Parent Category"} value={null} />
            {listParentCategory.map(item => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.groupBtn}>
          <TouchableOpacity
            onPress={this.onPressSave.bind(this)}
            style={[styles.btnContainer, styles.btnSave]}
          >
            <FontAwesome5
              style={[styles.btnIconSave, styles.icon]}
              size={20}
              name={"save"}
            />
            <Text style={styles.btnLabelSave}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressDelete.bind(this)}
            style={[styles.btnContainer, styles.btnDelete]}
          >
            <FontAwesome5
              style={[styles.btnIconSave, styles.icon]}
              size={20}
              name={"trash"}
            />
            <Text style={styles.btnLabelSave}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
  async onPressSave() {
    let { iconName, categoryName, parentCategory } = this.state
    let editCategory = this.props.editCategory
    dataOld = {
      data: firebase.firestore.FieldValue.arrayRemove({
        icon: editCategory.item.icon,
        name: editCategory.item.name
      })
    }
    dataNew = {
      data: firebase.firestore.FieldValue.arrayUnion({
        icon: iconName,
        name: categoryName
      })
    }
    if (this.validateData(iconName, categoryName, parentCategory)) {
      return Alert.alert("Please again!!")
    }
    await firebase
      .firestore()
      .collection("category")
      .doc(editCategory.key)
      .update(dataOld)
      .then()
      .catch(error => console.log(error.message))
    await firebase
      .firestore()
      .collection("category")
      .doc(parentCategory)
      .update(dataNew)
      .then(this.props.onPressClose)
      .catch(error => console.log(error.message))
  }
  onPressDelete = () => {
    let editCategory = this.props.editCategory
    data = {
      data: firebase.firestore.FieldValue.arrayRemove({
        icon: editCategory.item.icon,
        name: editCategory.item.name
      })
    }
    firebase
      .firestore()
      .collection("category")
      .doc(editCategory.key)
      .update(data)
      .then(this.props.onPressClose)
      .catch(error => console.log(error.message))
  }
  validateData = (iconName, categoryName, parentCategory) =>
    !iconName || !categoryName || !parentCategory
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
  btnContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginLeft: "10%",
    height: 35,
    borderRadius: 5,
    flex: 1
  },
  btnSave: {
    backgroundColor: "#329BFF"
  },
  btnDelete: {
    backgroundColor: "#FF0000"
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
  },
  pickerContainer: { flexDirection: "row", alignItems: "center", margin: 5 },
  groupBtn: { flexDirection: "row" }
})
