import { call, all, fork } from "redux-saga/effects"
import { watchCategory } from "./categorySagas"

export default function* rootSaga() {
  yield call(watchCategory)
}
