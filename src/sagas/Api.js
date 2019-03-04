import firebase from "../../Firebase"
import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED,
  OPEN_HUD,
  CLOSE_HUD,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED
} from "../actions/actionTypes"

function* getCategoryFromFireBase() {
  var data = {}
  yield firebase
    .firestore()
    .collection("category")
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot.size === 0) {
        data = {
          status: FETCH_CATEGORY_FAILED,
          response: "Fetch Category Fail"
        }
      } else {
        data = {
          status: FETCH_CATEGORY_SUCCESS,
          response: {
            category: querySnapshot.docs.map(item => ({
              data: item.data(),
              key: item.id
            })),
            listParentCategory: querySnapshot.docs.map(item => ({
              id: item.id,
              name: item.data().name
            }))
          }
        }
      }
    })
    .catch()
  return data
}

function* addCategory(newCategory) {
  let { iconName, categoryName, parentCategory } = newCategory
  data = {
    data: firebase.firestore.FieldValue.arrayUnion({
      icon: iconName,
      name: categoryName
    })
  }
  yield firebase
    .firestore()
    .collection("category")
    .doc(parentCategory)
    .update(data)
    .then()
    .catch()
  return newCategory
}

function* editCategory(dataNew, dataOld) {
  dataCategoryOld = {
    data: firebase.firestore.FieldValue.arrayRemove({
      icon: dataOld.iconName,
      name: dataOld.categoryName
    })
  }
  dataCategoryNew = {
    data: firebase.firestore.FieldValue.arrayUnion({
      icon: dataNew.iconName,
      name: dataNew.categoryName
    })
  }
  yield firebase
    .firestore()
    .collection("category")
    .doc(dataOld.parentCategory)
    .update(dataCategoryOld)
    .then()
    .catch()
  yield firebase
    .firestore()
    .collection("category")
    .doc(dataNew.parentCategory)
    .update(dataCategoryNew)
    .then()
    .catch()
  return dataNew
}

function* deleteCategory(category) {
  data = {
    data: firebase.firestore.FieldValue.arrayRemove({
      icon: category.iconName,
      name: category.categoryName
    })
  }
  firebase
    .firestore()
    .collection("category")
    .doc(category.parentCategory)
    .update(data)
    .then()
    .catch()
  return category
}

function* fetchWalletUser(uid) {
  var data = {}
  yield firebase
    .firestore()
    .collection("wallet")
    .doc(uid)
    .get()
    .then(function(querySnapshot) {
      data = querySnapshot.data()
    })
    .catch(error => console.log(error))
  return data
}

function* fetchHistoryUser(uid) {
  var data = {}
  yield firebase
    .firestore()
    .collection("history")
    .doc(uid)
    .get()
    .then(function(querySnapshot) {
      data = querySnapshot.data()
    })
    .catch(error => console.log(error))
  return data
}

export const Api = {
  getCategoryFromFireBase,
  addCategory,
  editCategory,
  deleteCategory,
  fetchWalletUser,
  fetchHistoryUser
}
