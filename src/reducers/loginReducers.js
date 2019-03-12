import { fromJS } from "immutable"
import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILED
} from "../actions/actionTypes"

initStateLogin = { message: "", status: "", uid: "", reLogin: "" }

const loginReducers = (state = initStateLogin, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case LOGIN_WITH_EMAIL_SUCCESS:
      newState.status = action.response.status
      newState.uid = action.response.uid
      break
    case LOGIN_WITH_EMAIL_FAILED:
      newState.status = action.response.status
      newState.message = action.response.message
      newState.reLogin = new Date().toString()
      break
    default:
      return state
  }
  return newState
}

export default loginReducers
