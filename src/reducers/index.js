import { combineReducers } from "redux"
import categoryReducers from "./categoryReducers"
import homeReducers from "./homeReducers"

const allReducers = combineReducers({ categoryReducers, homeReducers })

export default allReducers
