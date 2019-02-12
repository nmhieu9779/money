import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"

export default class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return <View style={styles.homeContainer} />
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1
  }
})
