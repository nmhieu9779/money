import { connect } from "react-redux"
import CategoryScreen from "../CategoryScreen/CategoryScreen"

import {
  fetchCategoryAction,
  addCategoryAction,
  editCategoryAction,
  deleteCategoryAction
} from "../actions"

const mapStateToProps = state => {
  return state.categoryReducers
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCategory: () => {
      dispatch(fetchCategoryAction())
    },
    onAddCategory: newCategory => {
      dispatch(addCategoryAction(newCategory))
    },
    onEditCategory: (dataNew, dataOld) => {
      dispatch(editCategoryAction(dataNew, dataOld))
    },
    onDeleteCategory: category => {
      dispatch(deleteCategoryAction(category))
    }
  }
}

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryScreen)
export default CategoryContainer
