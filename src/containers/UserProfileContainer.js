import { connect } from "react-redux"
import UserProfileScreen from "../UserProfileScreen/UserProfileScreen"
import { getUserProfileAction, setUserProfileAction } from "../actions"

const mapStateToProps = state => {
  return state.userProfileReducers
}
const mapDispatchToProps = dispatch => {
  return {
    onGetUserProfile: uid => {
      dispatch(getUserProfileAction(uid))
    },
    onSetUserProfile: data => {
      dispatch(setUserProfileAction(data))
    }
  }
}

const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen)
export default UserProfileContainer
