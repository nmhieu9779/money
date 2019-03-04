import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED,
  OPEN_HUD,
  CLOSE_HUD,
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

import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* fetchCategory() {
  try {
    yield put({ type: OPEN_HUD })
    const category = yield Api.getCategoryFromFireBase()
    yield put({ type: category.status, data: category.response })
    yield put({ type: CLOSE_HUD })
  } catch (error) {
    console.log(error)
  }
}

function* addCategory(payload) {
  try {
    yield put({ type: OPEN_HUD })
    yield Api.addCategory(payload.newCategory)
    yield put({ type: FETCH_CATEGORY })
    yield put({ type: CLOSE_HUD })
  } catch (error) {
    yield put({ type: ADD_CATEGORY_FAILED, error })
  }
}

function* editCategory(payload) {
  try {
    yield put({ type: OPEN_HUD })
    yield Api.editCategory(payload.dataNew, payload.dataOld)
    yield put({ type: FETCH_CATEGORY })
    yield put({ type: CLOSE_HUD })
  } catch (error) {
    yield put({ type: EDIT_CATEGORY_FAILED, error })
  }
}

function* deleteCategory(payload) {
  try {
    yield put({ type: OPEN_HUD })
    yield Api.deleteCategory(payload.category)
    yield put({ type: FETCH_CATEGORY })
    yield put({ type: CLOSE_HUD })
  } catch (error) {
    yield put({ type: DELETE_CATEGORY_FAILED, error })
  }
}

export function* watchCategory() {
  yield takeLatest(FETCH_CATEGORY, fetchCategory)
  yield takeLatest(ADD_CATEGORY, addCategory)
  yield takeLatest(EDIT_CATEGORY, editCategory)
  yield takeLatest(DELETE_CATEGORY, deleteCategory)
}
