import {
  FETCH_WALLET_USER,
  FETCH_WALLET_USER_SUCCESS,
  FETCH_WALLET_USER_FAILED
} from "../actions/actionTypes"

import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* fetchWalletUser(payload) {
  try {
    const data = yield Api.fetchWalletUser(payload.uid)
    yield put({ type: FETCH_WALLET_USER_SUCCESS, data: data })
  } catch (error) {
    yield put({ type: FETCH_WALLET_USER_FAILED, error })
  }
}

export function* watchHome() {
  yield takeLatest(FETCH_WALLET_USER, fetchWalletUser)
}
