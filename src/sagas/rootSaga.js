import { call, all, fork } from "redux-saga/effects"
import { watchCategory } from "./categorySagas"
import { watchHome } from "./homeSagas"
import { watchHistory } from "./historySagas"

export default function* rootSaga() {
  yield all([watchCategory(), watchHome(), watchHistory()])
}
