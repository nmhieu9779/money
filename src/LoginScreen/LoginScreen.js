import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Hoshi from "../Component/Hoshi"
import firebase from "../../Firebase"
import { LoginManager, AccessToken } from "react-native-fbsdk"
import MessageBox from "../Component/MessageBox"
export default class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: "nmhieu9779@gmail.com",
      password: "664438",
      showMessageBox: false,
      message: "",
      status: ""
    }
  }
  render() {
    var { email, password } = this.state
    return (
      <View style={styles.loginContainer}>
        {this.showMessageBox()}
        <View style={styles.topContainer}>
          <Text style={styles.topLabel}>Login</Text>
        </View>
        <View style={styles.loginForm}>
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
          <View style={styles.fgpwContainer}>
            <TouchableOpacity>
              <Text style={styles.fgpwLabel}>FORGOT PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.labelLogin}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.bottomLabel}>
            or login with your social account
          </Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.btnFacebook, styles.btnSocial]}
              onPress={this.onLoginFacebook.bind(this)}
            >
              <FontAwesome5 style={styles.iconSocial} name={"facebook"} />
              <Text style={styles.labelSocial}>FACEBOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnGoogle, styles.btnSocial]}>
              <FontAwesome5 style={styles.iconSocial} name={"google"} />
              <Text style={styles.labelSocial}>GOOGLE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  onLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this._loginAsync(response.user.uid)
      })
      .catch(error =>
        this.setState({
          showMessageBox: true,
          message: error.message,
          status: "Login Fail"
        })
      )
  }
  onLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(["email"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login Cancelled")
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken
            )
            firebase
              .auth()
              .signInAndRetrieveDataWithCredential(credential)
              .then(response => {
                console.log(response)
              })
              .catch(error => {
                console.log(error)
              })
          })
        }
      },
      function(error) {
        console.log(error)
      }
    )
  }
  _loginAsync = async uid => {
    await AsyncStorage.setItem("uid", uid)
    this.props.navigation.navigate("drawerStack")
  }
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
