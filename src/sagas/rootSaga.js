import { call, all, fork } from "redux-saga/effects"
import { watchCategory } from "./categorySagas"
import { watchHome } from "./homeSagas"

export default function* rootSaga() {
  yield all([watchCategory(), watchHome()])
}
