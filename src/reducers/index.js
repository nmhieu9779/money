import { combineReducers } from "redux"
import categoryReducers from "./categoryReducers"
import homeReducers from "./homeReducers"
import historyReducers from "./historyReducers"
import transactionReducers from "./transactionReducers"

const allReducers = combineReducers({
  categoryReducers,
  homeReducers,
  historyReducers,
  transactionReducers
})

export default allReducers
