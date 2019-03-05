import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILED
} from "../actions/actionTypes"
import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* addTransaction(payload) {
  try {
    yield Api.addTransaction(payload.payload)
  } catch (error) {}
}

export function* watchTransaction() {
  yield takeLatest(ADD_TRANSACTION, addTransaction)
}
