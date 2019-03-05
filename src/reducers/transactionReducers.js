import { fromJS } from "immutable"
import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILED
} from "../actions/actionTypes"

initStateTransaction = { success: false }

const transactionReducers = (state = initStateTransaction, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case ADD_TRANSACTION_SUCCESS:
      newState.success = true
      break
    default:
      return state
  }
  return newState
}

export default transactionReducers
