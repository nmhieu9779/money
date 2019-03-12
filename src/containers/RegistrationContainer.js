import { connect } from "react-redux"
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen"
import { registrationWithEmailAction, addDataNewUserAction } from "../actions"

const mapStateToProps = state => {
  return state.registrationReducers
}

const mapDispatchToProps = dispatch => {
  return {
    onRegistrationWithEmail: payload => {
      dispatch(registrationWithEmailAction(payload))
    },
    onAddDataNewUser: payload => {
      dispatch(addDataNewUserAction(payload))
    }
  }
}

const RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationScreen)
export default RegistrationContainer
