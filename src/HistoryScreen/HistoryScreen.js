import React, { Component } from "react"
import { View, StyleSheet, FlatList, Text, AsyncStorage } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import moment from "moment"

export default class HistoryScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount = () => {
    this.onFetchHistory()
  }

  onFetchHistory = async () => {
    const uid = await AsyncStorage.getItem("uid")
    this.setState({ uid: uid })
    this.props.onFetchHistory(uid)
  }

  render() {
    let { history } = this.props
    return (
      <FlatList
        data={history}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    )
  }

  _renderItem = ({ item }) => {
    let me = this
    let color = me.getColorStatus(item.status)
    return (
      <View style={styles.itemContainer}>
        <View style={styles.titleItemContainer}>
          <Text style={styles.titleItem}>{item.work}</Text>
          <View style={[styles.amountContainer, { borderColor: color }]}>
            <Text style={[styles.amount, { color: color }]}>{item.amount}</Text>
          </View>
        </View>
        <View style={styles.itemLabel}>
          <FontAwesome5 style={styles.clock} name={"align-right"} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.itemLabel}>
          <FontAwesome5 style={styles.clock} name={"clock"} />
          <Text>{moment(new Date(item.time)).format("LLL")}</Text>
        </View>
      </View>
    )
  }

  getColorStatus = status => (status === "expense" ? "red" : "blue")

  _keyExtractor = (item, index) =>
    moment(new Date(item.time)).format() + index.toString()
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1
  },
  itemContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 5
  },
  titleItemContainer: {
    flexDirection: "row"
  },
  titleItem: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
    textAlignVertical: "center",
    fontSize: 20
  },
  amountContainer: {
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 5
  },
  amount: {},
  description: {
    fontStyle: "italic"
  },
  itemLabel: {
    flexDirection: "row",
    alignItems: "center"
  },
  clock: {
    marginRight: 5
  }
})
