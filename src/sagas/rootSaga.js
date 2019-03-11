import { call, all, fork } from "redux-saga/effects"
import { watchCategory } from "./categorySagas"
import { watchHome } from "./homeSagas"
import { watchHistory } from "./historySagas"
import { watchTransaction } from "./transactionSagas"
import { watchUserProfile } from "./userProfileSagas"

export default function* rootSaga() {
  yield all([
    watchCategory(),
    watchHome(),
    watchHistory(),
    watchTransaction(),
    watchUserProfile()
  ])
}
