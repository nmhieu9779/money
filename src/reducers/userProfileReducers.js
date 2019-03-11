import { fromJS } from "immutable"
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  SET_USER_PROFILE,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_FAILED
} from "../actions/actionTypes"

initStateUserProfile = {
  data: {
    nameDisplay: "",
    tel: "",
    dob: "",
    address: "",
    occupations: "",
    sex: "Male",
    avatar: "",
    change: false
  }
}

const userProfileReducers = (state = initStateUserProfile, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      newState.data = action.data
      break
    case SET_USER_PROFILE_SUCCESS:
      newState.data = action.data
      break
    default:
      return state
  }
  return newState
}

export default userProfileReducers
