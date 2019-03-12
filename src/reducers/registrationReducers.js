import { fromJS } from "immutable"
import {
  REGISTRATION_WITH_EMAIL,
  REGISTRATION_WITH_EMAIL_SUCCESS,
  REGISTRATION_WITH_EMAIL_FAILED
} from "../actions/actionTypes"

initStateRegistration = {
  status: "",
  reRegistration: "",
  uid: "",
  message: "",
  email: "",
  password: ""
}

const registrationReducers = (state = initStateRegistration, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case REGISTRATION_WITH_EMAIL_SUCCESS:
      newState.status = action.response.status
      newState.uid = action.response.uid
      newState.email = action.response.email
      newState.password = action.response.password
      break
    case REGISTRATION_WITH_EMAIL_FAILED:
      newState.status = action.response.status
      newState.message = action.response.message
      newState.reRegistration = new Date().toString()
      break
    default:
      return state
  }
  return newState
}

export default registrationReducers
