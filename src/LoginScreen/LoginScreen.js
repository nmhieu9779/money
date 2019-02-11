import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Hoshi from "../Component/Hoshi"

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.loginContainer}>
        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: "#5495ff",
            justifyContent: "flex-end"
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              margin: 15
            }}
          >
            Login
          </Text>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <Hoshi label={"Email"} />
          <Hoshi label={"Password"} secureTextEntry={true} />
          <View
            style={{ width: "100%", alignItems: "flex-end", marginTop: 15 }}
          >
            <TouchableOpacity>
              <Text style={{ color: "#5495ff", fontWeight: "bold" }}>
                FORGOT PASSWORD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingBottom: 30 }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              width: "80%",
              borderRadius: 999,
              backgroundColor: "#35ba47",
              padding: 10
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 10 }}>
            or login with your social account
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#5495ff",
                borderRadius: 999,
                width: "40%",
                justifyContent: "center",
                margin: 10
              }}
            >
              <FontAwesome5
                style={{ color: "white", paddingRight: 5 }}
                name={"facebook"}
              />
              <Text style={{ color: "white", fontWeight: "bold" }}>
                FACEBOOK
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#d83c3c",
                borderRadius: 999,
                width: "40%",
                justifyContent: "center",
                margin: 10
              }}
            >
              <FontAwesome5
                style={{ color: "white", paddingRight: 5 }}
                name={"google"}
              />
              <Text style={{ color: "white", fontWeight: "bold" }}>GOOGLE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1
  }
})
