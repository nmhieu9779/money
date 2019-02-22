import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native"

export default class AddTransactionsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <View style={styles.addTransactionsComponent} />
  }
}

const styles = StyleSheet.create({
  addTransactionsComponent: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
