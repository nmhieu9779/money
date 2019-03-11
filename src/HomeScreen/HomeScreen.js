import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native"
import firebase from "../../Firebase"
import HistoryScreen from "../HistoryScreen/HistoryScreen"
import BottomAppContainer from "../Navigation/TabbarBottomHome"
import Spinner from "../Component/LoadingHud"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    let data = this.props.navigation.state.params
    this.setState({ uid: data.uid, showHud: true })
  }

  componentDidMount = () => {
    this.props.onFetchWalletUser(this.state.uid)
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

  componentDidUpdate = prevProps => {
    if (prevProps != this.props) {
      this.setState({ showHud: false })
    }
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        {this.showHud(this.state.showHud)}
        <View style={[styles.financialContainer, styles.boxShadow]}>
          <Text style={styles.financialLabel}>FINANCIAL STATEMENT</Text>
          <Text style={styles.financialStatement}>
            {this.props.total}
            {"₫"}
          </Text>
        </View>
        <BottomAppContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#cccfff"
  },
  boxShadow: {
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowColor: "gray",
    elevation: 3
  },
  financialContainer: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10
  },
  financialLabel: {
    color: "black"
  },
  financialStatement: {
    color: "#329BFF",
    fontSize: 30,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center"
  }
})
