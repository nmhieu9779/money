import { fromJS } from "immutable"
import {
  OPEN_HUD,
  CLOSE_HUD,
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED
} from "../actions/actionTypes"

initState = {
  data: { category: [], listParentCategory: [] },
  showHud: false
}

const categoryReducers = (state = initState, action) => {
  let newState = fromJS(state).toJS()
  switch (action.type) {
    case FETCH_CATEGORY_SUCCESS:
      newState.data = action.data
      break
    case FETCH_CATEGORY_FAILED:
      console.log("failed")
      break
    case OPEN_HUD:
      newState.showHud = true
      break
    case CLOSE_HUD:
      newState.showHud = false
      break
    case ADD_CATEGORY_FAILED:
      console.log(action.error)
      break
    case EDIT_CATEGORY_FAILED:
      console.log(action.error)
      break
    case DELETE_CATEGORY_FAILED:
      console.log(action.error)
      break
    default:
      return state
  }
  return newState
}

export default categoryReducers
