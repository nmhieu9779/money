import { fromJS } from "immutable"
import {
  FETCH_WALLET_USER_SUCCESS,
  FETCH_WALLET_USER_FAILED
} from "../actions/actionTypes"

initStateHome = { total: 0 }

const homeReducers = (state = initStateHome, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case FETCH_WALLET_USER_SUCCESS:
      newState.total = action.data.total
      break
    case FETCH_WALLET_USER_FAILED:
      break
    default:
      return state
  }
  return newState
}

export default homeReducers
