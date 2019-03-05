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
    onFetchAll: () => {
      dispatch(fetchHistoryUserAction("30Zhx7sy1bfvX8EPxiLwJHK0fjj2"))
      dispatch(fetchWalletUserAction("30Zhx7sy1bfvX8EPxiLwJHK0fjj2"))
    }
  }
}

const TransactionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsScreen)
export default TransactionContainer
