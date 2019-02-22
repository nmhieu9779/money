import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native"
import firebase from "../../Firebase"
import HistoryScreen from "../HistoryScreen/HistoryScreen"
import BottomAppContainer from "../Navigation/TabbarBottomHome"
export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => {
    let data = this.props.navigation.state.params
    this.setState(data)
  }

  componentDidMount = () => {}

  getDataFromSeverWithUid = () => {
    this.setState({ showHud: true })
    let me = this
    let { uid } = this.state
    firebase
      .firestore()
      .collection("user")
      .doc(uid)
      .get()
      .then(function(querySnapshot) {
        me.setState(querySnapshot.data())
      })
      .finally(() =>
        setTimeout(() => {
          this.setState({ showHud: false })
        }, 1000)
      )
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <View style={[styles.financialContainer, styles.boxShadow]}>
          <Text style={styles.financialLabel}>FINANCIAL STATEMENT</Text>
          <Text style={styles.financialStatement}>
            {this.state.data.total}
            {"₫"}
          </Text>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate("CategoryScreen")}
          title={"abc"}
        />
        <BottomAppContainer history={this.state.data.history} />
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
