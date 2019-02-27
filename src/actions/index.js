import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED
} from "./actionTypes"

export const fetchCategoryAction = () => {
  return { type: FETCH_CATEGORY }
}

export const fetchCategorySuccessAction = category => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    category
  }
}

export const fetchCategoryFailedAction = error => {
  return {
    type: FETCH_CATEGORY_FAILED,
    error
  }
}
