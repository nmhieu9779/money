import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  SET_USER_PROFILE,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_FAILED
} from "../actions/actionTypes"
import { put, takeLatest } from "redux-saga/effects"
import { Api } from "./Api"

function* getUserProfile(payload) {
  try {
    const data = yield Api.getUserProfile(payload.payload)
    yield put({ type: GET_USER_PROFILE_SUCCESS, data: data })
  } catch (error) {}
}

function* setUserProfile(payload) {
  try {
    const data = yield Api.setUserProfile(payload.payload)
    yield put({ type: SET_USER_PROFILE_SUCCESS, data: data })
  } catch (error) {}
}

export function* watchUserProfile() {
  yield takeLatest(GET_USER_PROFILE, getUserProfile)
  yield takeLatest(SET_USER_PROFILE, setUserProfile)
}
