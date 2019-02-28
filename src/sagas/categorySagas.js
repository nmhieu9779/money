import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED
} from "../actions/actionTypes"

import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* fetchCategory(dataa) {
  try {
    const category = yield Api.getCategoryFromFireBase(dataa)
    yield put({ type: FETCH_CATEGORY_SUCCESS, category })
  } catch (error) {
    yield put({ type: FETCH_CATEGORY_FAILED, error })
  }
}

export function* watchFetchCategory() {
  yield takeLatest(FETCH_CATEGORY, fetchCategory)
}
