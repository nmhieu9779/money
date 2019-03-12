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

defaultState = { email: "", password: "", showMessageBox: false }
export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount = () => this.setState(defaultState)

  componentDidUpdate = prevProps => {
    let me = this
    if (prevProps.login != this.props.login) {
      if (this.props.login.status === "failed") {
        me.setState({ showMessageBox: true })
      } else {
        me._loginAsync(this.props.login.uid)
      }
    }
  }

  getEmailPassword = () => {
    this.setState({
      email: this.props.registration.email,
      password: this.props.registration.password
    })
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
            paddingProps={16}
          />
          <Hoshi
            label={"Password"}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password: password })}
            value={password}
            paddingProps={16}
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
          <View style={styles.registrationContainer}>
            <Text>Don't have a account?</Text>
            <TouchableOpacity onPress={this.onRegistration.bind(this)}>
              <Text style={styles.registration}>Registration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  onLogin = () => {
    const { email, password } = this.state
    this.props.onLoginWithEmail({ email, password })
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
  onRegistration = () => {
    this.props.navigation.navigate("registrationScreen", {
      getEmailPassword: this.getEmailPassword.bind(this)
    })
  }

  _loginAsync = async uid => {
    await AsyncStorage.setItem("uid", uid)
    await this.props.navigation.navigate("HomeScreen", { uid: uid })
  }

  showMessageBox = () =>
    this.state.showMessageBox ? (
      <MessageBox
        onPressOk={() => {
          this.setState({ showMessageBox: false })
        }}
        message={this.props.login.message}
        status={"Login Failed"}
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
    backgroundColor: "#329BFF",
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
  },
  registrationContainer: {
    flexDirection: "row"
  },
  registration: {
    paddingLeft: 5,
    color: "#5495ff",
    fontWeight: "bold"
  }
})
