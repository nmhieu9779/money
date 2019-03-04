import { connect } from "react-redux"
import HistoryScreen from "../HistoryScreen/HistoryScreen"
import { fetchHistoryUserAction } from "../actions"

const mapStateToProps = state => {
  console.log(state)
  return state.historyReducers
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchHistory: uid => {
      dispatch(fetchHistoryUserAction(uid))
    }
  }
}

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryScreen)
export default HistoryContainer
