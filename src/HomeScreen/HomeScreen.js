import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native"

export default class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <Button
          onPress={() => this.props.navigation.navigate("CategoryScreen")}
          title={"abc"}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1
  }
})
