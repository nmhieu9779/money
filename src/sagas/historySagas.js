import {
  FETCH_HISTORY_USER,
  FETCH_HISTORY_USER_SUCCESS,
  FETCH_HISTORY_USER_FAILED
} from "../actions/actionTypes"

import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* fetchHistoryUser(payload) {
  try {
    const data = yield Api.fetchHistoryUser(payload.uid)
    yield put({ type: FETCH_HISTORY_USER_SUCCESS, data: data })
  } catch (error) {
    yield put({ type: FETCH_HISTORY_USER_FAILED, error })
  }
}

export function* watchHistory() {
  yield takeLatest(FETCH_HISTORY_USER, fetchHistoryUser)
}
