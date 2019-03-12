import { connect } from "react-redux"
import DrawerMenu from "../Navigation/DrawerMenu"
import { fetchWalletUserAction, fetchHistoryUserAction } from "../actions"

const mapStateToProps = state => {
  return state.userProfileReducers
}

const mapDispatchToProps = dispatch => {
  return {
    onFetch: () => {
      dispatch(fetchWalletUserAction("default"))
      dispatch(fetchHistoryUserAction("default"))
    }
  }
}

const DrawerMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMenu)
export default DrawerMenuContainer
