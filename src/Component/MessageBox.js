import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import Modal from "./ModalBox"

export default class MessageBox extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Modal
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 250,
          width: 250,
          borderRadius: 5,
          opacity: 0.9
        }}
        swipeToClose={false}
        backdropPressToClose={false}
        position={"center"}
        isOpen={true}
        ref={"modal3"}
      >
        <Text
          style={{
            width: "100%",
            height: 50,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
            textAlignVertical: "center",
            position: "absolute",
            top: 0
          }}
        >
          {this.props.status}
        </Text>
        <Text style={{ marginTop: 40, marginBottom: 40, padding: 10 }}>
          {this.props.message}
        </Text>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: 50,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            width: "100%"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.onPressOk.bind(this)}
          >
            <Text
              style={{ color: "#17C8FF", fontSize: 20, fontWeight: "bold" }}
            >
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
  onPressOk = () => {
    this.refs.modal3.close()
    setTimeout(() => {
      this.props.onPressOk()
    }, 400)
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1
  },
  topContainer: {
    width: "100%",
    height: "20%",
    backgroundColor: "#5495ff",
    justifyContent: "flex-end"
  },
  topLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 15
  },
  bottomContainer: {
    alignItems: "center",
    paddingBottom: 30
  },
  labelLogin: {
    fontWeight: "bold",
    color: "white"
  },
  bottomLabel: {
    marginTop: 10
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btnLogin: {
    alignItems: "center",
    width: "80%",
    borderRadius: 999,
    backgroundColor: "#35ba47",
    padding: 10
  },
  btnSocial: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 999,
    width: "40%",
    justifyContent: "center",
    margin: 10
  },
  btnFacebook: { backgroundColor: "#5495ff" },
  btnGoogle: { backgroundColor: "#d83c3c" },
  iconSocial: {
    color: "white",
    paddingRight: 5
  },
  labelSocial: {
    color: "white",
    fontWeight: "bold"
  },
  loginForm: {
    flex: 1,
    padding: 20
  },
  fgpwContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 15
  },
  fgpwLabel: {
    color: "#5495ff",
    fontWeight: "bold"
  }
})
