import React, { Component } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import Hoshi from "../Component/Hoshi"
import firebase from "../../Firebase"
import MessageBox from "../Component/MessageBox"

export default class RegistrationScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      rePassword: "",
      showMessageBox: false,
      message: "",
      status: ""
    }
  }
  render() {
    var { email, password, rePassword } = this.state
    return (
      <View style={styles.registrationContainer}>
        {this.showMessageBox()}
        <View style={styles.topContainer}>
          <Text style={styles.topLabel}>Registration</Text>
        </View>
        <View style={styles.registrationForm}>
          <Hoshi
            label={"Email"}
            onChangeText={email => this.setState({ email: email })}
            value={email}
          />
          <Hoshi
            label={"Password"}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password: password })}
            value={password}
          />
          <Hoshi
            label={"Re-Password"}
            secureTextEntry={true}
            onChangeText={rePassword =>
              this.setState({ rePassword: rePassword })
            }
            value={rePassword}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.btnRegistration}
            onPress={this.onRegistration.bind(this)}
          >
            <Text style={styles.labelRegistration}>REGISTRATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  onRegistration = () => {
    const { email, password, rePassword } = this.state
    let me = this
    if (this.validatePassword(password, rePassword)) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => me.props.navigation.navigate("loginScreen"))
        .catch(error =>
          this.setState({
            showMessageBox: true,
            message: error.message,
            status: "Registration Fail"
          })
        )
    } else {
      this.setState({
        showMessageBox: true,
        message: "Incorrect Password",
        status: "Registration Fail"
      })
    }
  }

  validatePassword = (password, rePassword) =>
    password != "" && password === rePassword

  showMessageBox = () =>
    this.state.showMessageBox ? (
      <MessageBox
        onPressOk={() => {
          this.setState({ showMessageBox: false, message: "", status: "" })
        }}
        message={this.state.message}
        status={this.state.status}
      />
    ) : null
}

const styles = StyleSheet.create({
  registrationContainer: {
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
  labelRegistration: {
    fontWeight: "bold",
    color: "white"
  },
  btnRegistration: {
    alignItems: "center",
    width: "80%",
    borderRadius: 999,
    backgroundColor: "#329BFF",
    padding: 10
  },
  registrationForm: {
    flex: 1,
    padding: 20
  }
})
