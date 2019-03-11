import { connect } from "react-redux"
import DrawerMenu from "../Navigation/DrawerMenu"
import {} from "../actions"

const mapStateToProps = state => {
  return state.userProfileReducers
}

const mapDispatchToProps = dispatch => {
  return {}
}

const DrawerMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMenu)
export default DrawerMenuContainer
