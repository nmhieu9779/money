import { combineReducers } from "redux"
import categoryReducers from "./categoryReducers"
import homeReducers from "./homeReducers"
import historyReducers from "./historyReducers"
import transactionReducers from "./transactionReducers"
import userProfileReducers from "./userProfileReducers"
import loginReducers from "./loginReducers"
import registrationReducers from "./registrationReducers"

const allReducers = combineReducers({
  categoryReducers,
  homeReducers,
  historyReducers,
  transactionReducers,
  userProfileReducers,
  loginReducers,
  registrationReducers
})

export default allReducers
