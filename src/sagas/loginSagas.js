import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILED
} from "../actions/actionTypes"

import { put, takeLatest, retry } from "redux-saga/effects"
import { Api } from "./Api"

function* loginWithEmail(payload) {
  try {
    const response = yield Api.loginWithEmail(payload.payload)
    if (response.status === "success") {
      yield put({ type: LOGIN_WITH_EMAIL_SUCCESS, response: response })
    } else {
      yield put({ type: LOGIN_WITH_EMAIL_FAILED, response: response })
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_WITH_EMAIL, loginWithEmail)
}
