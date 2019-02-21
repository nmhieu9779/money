import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native"
import firebase from "../../Firebase"
import HistoryScreen from "../HistoryScreen/HistoryScreen"

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
        <Button
          onPress={() => this.props.navigation.navigate("CategoryScreen")}
          title={"abc"}
        />
        <HistoryScreen style={{ flex: 1 }} history={this.state.data.history} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1
  }
})
