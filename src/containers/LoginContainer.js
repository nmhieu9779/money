import { connect } from "react-redux"
import LoginScreen from "../LoginScreen/LoginScreen"
import { loginWithEmailAction } from "../actions"

const mapStateToProps = state => {
  return {
    login: state.loginReducers,
    registration: state.registrationReducers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginWithEmail: payload => {
      dispatch(loginWithEmailAction(payload))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
export default LoginContainer
