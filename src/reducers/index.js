import { combineReducers } from "redux"
import categoryReducers from "./categoryReducers"

const allReducers = combineReducers({ categoryReducers })

export default allReducers
