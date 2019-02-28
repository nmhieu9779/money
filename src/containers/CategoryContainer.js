import { connect } from "react-redux"
import CategoryScreen from "../CategoryScreen/CategoryScreen"

import {
  fetchCategoryAction,
  fetchCategorySuccessAction,
  fetchCategoryFailedAction
} from "../actions"

const mapStateToProps = state => {
  return {
    data: state.categoryReducers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCategory: () => {
      dispatch(fetchCategoryAction())
    }
  }
}

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryScreen)
export default CategoryContainer
