import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage,
  Picker
} from "react-native"
import Hoshi from "../Component/Hoshi"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import moment from "moment"

const defaultState = {
  iconName: "question",
  categoryName: "Select Category",
  amount: "",
  description: "",
  time: new Date(),
  status: "expense"
}
export default class AddTransactionsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    return this.setState(defaultState)
  }

  componentDidMount = () => {
    this.getUid()
  }

  getUid = async () => {
    const uid = await AsyncStorage.getItem("uid")
    this.setState({ uid: uid })
  }

  render() {
    return (
      <View style={styles.addTransactionsComponent}>
        <View style={styles.amountContainer}>
          <Text>Amount</Text>
          <View style={styles.textInputAmountContainer}>
            <Hoshi
              style={{ flex: 1 }}
              textAlign={"right"}
              value={this.formatMoney(this.state.amount)}
              keyboardType={"numeric"}
              paddingProps={0}
              onChangeText={text =>
                this.setState({ amount: this.unFormatMoney(text) })
              }
            />
            <Text style={styles.labelAmount}>{"₫"}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.onPressChooseCategory.bind(this)}
            style={styles.itemContainer}
          >
            <View style={[styles.iconContainer, styles.iconContainerBorder]}>
              <FontAwesome5
                size={20}
                color={"white"}
                name={this.state.iconName}
              />
            </View>
            <Text style={[styles.labelCategory, styles.borderBottomLabel]}>
              {this.state.categoryName}
            </Text>
          </TouchableOpacity>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome5 size={20} name={"align-right"} />
            </View>
            <TextInput
              style={[styles.borderBottomLabel]}
              multiline={true}
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
            />
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome5
                size={20}
                name={"clock"}
                onPress={() => this.setState({ time: new Date() })}
              />
            </View>
            <Text style={[styles.borderBottomLabel, styles.labelTime]}>
              {moment(this.state.time).format("LLL")}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome5 size={20} name={this.getIconStatus()} />
            </View>
            <Picker
              selectedValue={this.state.status}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ status: itemValue })
              }
              style={{ flex: 1 }}
              mode={"dropdown"}
            >
              <Picker.Item label="Expense" value="expense" color="red" />
              <Picker.Item label="InCome" value="inCome" color="blue" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={this.onPressSave.bind(this)}
          style={styles.btnSaveContainer}
        >
          <Text style={styles.labelBtnSave}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
  getIconStatus = () => (this.state.status === "expense" ? "minus" : "plus")
  chooseCategory = item => {
    this.setState({ iconName: item.icon, categoryName: item.name })
  }
  onPressChooseCategory = () => {
    this.props.navigation.navigate("CategoryScreen", {
      chooseCategory: this.chooseCategory.bind(this)
    })
  }
  onPressSave = async () => {
    let { amount, categoryName, description, time, status, uid } = this.state
    let { total } = this.props
    if (!!amount && categoryName != "Select Category") {
      await this.props.onAddTransaction({
        amount,
        categoryName,
        description,
        time,
        total,
        status,
        uid
      })
      await this.setState(defaultState)
      await this.props.onFetchAll(uid)
    } else {
      alert("Please Try Again")
    }
  }
  formatMoney = money => money.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  unFormatMoney = money => money.replace(/,/g, "")
}

const styles = StyleSheet.create({
  addTransactionsComponent: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center"
  },
  amountContainer: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  textInputAmountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  labelAmount: {
    color: "red",
    fontSize: 30,
    textAlign: "center"
  },
  container: { backgroundColor: "#fff", width: "100%", marginBottom: 10 },
  itemContainer: {
    flexDirection: "row"
  },
  iconContainer: {
    margin: 5,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainerBorder: {
    borderRadius: 999,
    backgroundColor: "#ccc"
  },
  labelCategory: {
    fontSize: 22,
    textAlignVertical: "center"
  },
  borderBottomLabel: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    flex: 1
  },
  labelTime: {
    textAlignVertical: "center"
  },
  btnSaveContainer: {
    width: "85%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#329BFF",
    borderRadius: 8
  },
  labelBtnSave: { fontSize: 15, fontWeight: "bold", color: "white" }
})
