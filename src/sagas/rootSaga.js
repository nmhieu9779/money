import { call, all } from "redux-saga/effects"
import { watchFetchCategory } from "./categorySagas"

export default function* rootSaga() {
  yield call(watchFetchCategory)
}
