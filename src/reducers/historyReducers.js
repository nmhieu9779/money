import { fromJS } from "immutable"
import {
  FETCH_HISTORY_USER_SUCCESS,
  FETCH_HISTORY_USER_FAILED
} from "../actions/actionTypes"

initStateHistory = {
  history: [{ amount: 0, description: "", time: "", work: "" }]
}

const historyReducers = (state = initStateHistory, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case FETCH_HISTORY_USER_SUCCESS:
      newState.history = action.data.data
      break
    case FETCH_HISTORY_USER_FAILED:
      break
    default:
      return state
  }
  return newState
}

export default historyReducers
