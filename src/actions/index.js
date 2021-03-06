import {
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
  DELETE_CATEGORY_FAILED,
  FETCH_WALLET_USER,
  FETCH_WALLET_USER_SUCCESS,
  FETCH_WALLET_USER_FAILED,
  FETCH_HISTORY_USER,
  FETCH_HISTORY_USER_SUCCESS,
  FETCH_HISTORY_USER_FAILED,
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILED,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  SET_USER_PROFILE,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_FAILED,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILED,
  REGISTRATION_WITH_EMAIL,
  REGISTRATION_WITH_EMAIL_SUCCESS,
  REGISTRATION_WITH_EMAIL_FAILED,
  ADD_DATA_NEW_USER,
  ADD_DATA_NEW_USER_SUCCESS,
  ADD_DATA_NEW_USER_FAILED
} from "./actionTypes"

export const fetchCategoryAction = () => {
  return { type: FETCH_CATEGORY }
}
export const fetchCategorySuccessAction = payload => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload
  }
}
export const fetchCategoryFailedAction = error => {
  return {
    type: FETCH_CATEGORY_FAILED,
    error
  }
}

export const addCategoryAction = newCategory => ({
  type: ADD_CATEGORY,
  newCategory
})
export const addCategorySuccessAction = payload => ({
  type: ADD_CATEGORY_SUCCESS,
  payload
})
export const addCategoryFailedAction = error => ({
  type: ADD_CATEGORY_FAILED,
  error
})

export const editCategoryAction = (dataNew, dataOld) => ({
  type: EDIT_CATEGORY,
  dataNew,
  dataOld
})
export const editCategorySuccessAction = payload => ({
  type: EDIT_CATEGORY_SUCCESS,
  payload
})
export const editCategoryFailedAction = error => ({
  type: EDIT_CATEGORY_FAILED,
  error
})

export const deleteCategoryAction = category => ({
  type: DELETE_CATEGORY,
  category
})
export const deleteCategorySuccessAction = payload => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload
})
export const deleteCategoryFailedAction = error => ({
  type: DELETE_CATEGORY_FAILED,
  error
})

export const fetchWalletUserAction = uid => ({ type: FETCH_WALLET_USER, uid })
export const fetchWalletUserSuccessAction = payload => ({
  type: FETCH_WALLET_USER_SUCCESS,
  payload
})
export const fetchWalletUserFailedAction = error => ({
  type: FETCH_WALLET_USER_FAILED,
  error
})

export const fetchHistoryUserAction = uid => ({ type: FETCH_HISTORY_USER, uid })
export const fetchHistoryUserSuccessAction = payload => ({
  type: FETCH_HISTORY_USER_SUCCESS,
  payload
})
export const fetchHistoryUserFailedAction = error => ({
  type: FETCH_HISTORY_USER_FAILED,
  error
})

export const addTransactionAction = payload => ({
  type: ADD_TRANSACTION,
  payload
})
export const addTransactionSuccessAction = payload => ({
  type: ADD_TRANSACTION_SUCCESS,
  payload
})
export const addTransactionFailedAction = error => ({
  type: ADD_TRANSACTION_FAILED,
  error
})

export const getUserProfileAction = payload => ({
  type: GET_USER_PROFILE,
  payload
})
export const getUserProfileSuccessAction = payload => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload
})
export const getUserProfileFailedAction = error => ({
  type: GET_USER_PROFILE_FAILED,
  error
})

export const setUserProfileAction = payload => ({
  type: SET_USER_PROFILE,
  payload
})
export const setUserProfileSuccessAction = payload => ({
  type: SET_USER_PROFILE_SUCCESS,
  payload
})
export const setUserProfileFailedAction = error => ({
  type: SET_USER_PROFILE_FAILED,
  error
})

export const loginWithEmailAction = payload => ({
  type: LOGIN_WITH_EMAIL,
  payload
})
export const loginWithEmailSuccessAction = payload => ({
  type: LOGIN_WITH_EMAIL_SUCCESS,
  payload
})
export const loginWithEmailFailedAction = error => ({
  type: LOGIN_WITH_EMAIL_FAILED,
  error
})

export const registrationWithEmailAction = payload => ({
  type: REGISTRATION_WITH_EMAIL,
  payload
})
export const registrationWithEmailSuccessAction = payload => ({
  type: REGISTRATION_WITH_EMAIL_SUCCESS,
  payload
})
export const registrationWithEmailFailedAction = error => ({
  type: REGISTRATION_WITH_EMAIL_FAILED,
  error
})

export const addDataNewUserAction = payload => ({
  type: ADD_DATA_NEW_USER,
  payload
})
export const addDataNewUserSuccessAction = payload => ({
  type: ADD_DATA_NEW_USER_SUCCESS,
  payload
})
export const addDataNewUserFailedAction = error => ({
  type: ADD_DATA_NEW_USER_FAILED,
  error
})
