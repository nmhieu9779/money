import { connect } from "react-redux"
import TransactionsScreen from "../TransactionsScreen/AddTransactionsScreen"
import {
  addTransactionAction,
  fetchHistoryUserAction,
  fetchWalletUserAction
} from "../actions"

const mapStateToProps = state => (state.transactionReducers, state.homeReducers)

const mapDispatchToProps = dispatch => {
  return {
    onAddTransaction: data => {
      dispatch(addTransactionAction(data))
    },
    onFetchAll: uid => {
      dispatch(fetchHistoryUserAction(uid))
      dispatch(fetchWalletUserAction(uid))
    }
  }
}

const TransactionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsScreen)
export default TransactionContainer
