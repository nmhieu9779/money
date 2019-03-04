import { connect } from "react-redux"
import HomeScreen from "../HomeScreen/HomeScreen"

import { fetchWalletUserAction } from "../actions"

const mapStateToProps = state => {
  return state.homeReducers
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchWalletUser: uid => {
      dispatch(fetchWalletUserAction(uid))
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
export default HomeContainer
