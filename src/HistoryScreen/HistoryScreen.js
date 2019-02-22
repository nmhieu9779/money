import React, { Component } from "react"
import { View, StyleSheet, FlatList, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import moment from "moment"

export default class HistoryScreen extends Component {
  constructor() {
    super()
    this.state = {}
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
    return (
      <View style={styles.itemContainer}>
        <View style={styles.titleItemContainer}>
          <Text style={styles.titleItem}>{item.work}</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{item.amount}</Text>
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

  _keyExtractor = item => moment(new Date(item.time)).format()
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
    borderColor: "#ff0000",
    padding: 5
  },
  amount: {
    color: "#ff0000"
  },
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
