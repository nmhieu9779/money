import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import Modal from "./ModalBox"

export default class MessageBox extends Component {
  render() {
    const { status, message } = this.props
    return (
      <Modal
        style={styles.messageBoxContainer}
        swipeToClose={false}
        backdropPressToClose={false}
        position={"center"}
        isOpen={true}
        ref={"modal"}
      >
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.btnOkContainer}>
          <TouchableOpacity
            style={styles.btnOk}
            onPress={this.onPressOk.bind(this)}
          >
            <Text style={styles.labelBtnOk}>{"Ok"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
  onPressOk = () => {
    this.refs.modal.close()
    setTimeout(() => {
      this.props.onPressOk()
    }, 400)
  }
}

const styles = StyleSheet.create({
  messageBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: 250,
    borderRadius: 5,
    opacity: 0.9
  },
  status: {
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
  },
  message: {
    marginTop: 40,
    marginBottom: 40,
    padding: 10
  },
  btnOkContainer: {
    position: "absolute",
    bottom: 0,
    height: 50,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    width: "100%"
  },
  btnOk: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  labelBtnOk: { color: "#17C8FF", fontSize: 20, fontWeight: "bold" }
})
