import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED
} from "../actions/actionTypes"

initState = { category: [], listParentCategory: [] }

const categoryReducers = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCESS:
      return action.category
    case FETCH_CATEGORY_FAILED:
      return action.error
    default:
      return state
  }
}

export default categoryReducers
