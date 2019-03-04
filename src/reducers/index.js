import { combineReducers } from "redux"
import categoryReducers from "./categoryReducers"
import homeReducers from "./homeReducers"
import historyReducers from "./historyReducers"

const allReducers = combineReducers({
  categoryReducers,
  homeReducers,
  historyReducers
})

export default allReducers
