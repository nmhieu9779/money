import {
  REGISTRATION_WITH_EMAIL,
  REGISTRATION_WITH_EMAIL_SUCCESS,
  REGISTRATION_WITH_EMAIL_FAILED,
  ADD_DATA_NEW_USER,
  ADD_DATA_NEW_USER_SUCCESS,
  ADD_DATA_NEW_USER_FAILED
} from "../actions/actionTypes"

import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* registrationWithEmail(payload) {
  try {
    const response = yield Api.registrationWithEmail(payload.payload)
    if (response.status === "success") {
      yield put({ type: REGISTRATION_WITH_EMAIL_SUCCESS, response: response })
    } else {
      yield put({ type: REGISTRATION_WITH_EMAIL_FAILED, response: response })
    }
  } catch (error) {
    console.log(error)
  }
}

function* addDataNewUser(payload) {
  try {
    yield Api.addDataNewUser(payload.payload)
  } catch (error) {
    console.log(error)
  }
}

export function* watchRegistration() {
  yield takeLatest(REGISTRATION_WITH_EMAIL, registrationWithEmail)
  yield takeLatest(ADD_DATA_NEW_USER, addDataNewUser)
}
