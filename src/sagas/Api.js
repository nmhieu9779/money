import firebase from "../../Firebase"
import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILED,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED
} from "../actions/actionTypes"
import uuid from "uuid"

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

function* addTransaction(data) {
  dataNew = {
    data: firebase.firestore.FieldValue.arrayUnion({
      amount: data.amount,
      description: data.description,
      time: data.time.toString(),
      work: data.categoryName,
      status: data.status
    })
  }
  let total = parseFloat(data.total)
  let amount = parseFloat(data.amount)
  let newTotal = data.status === "expense" ? total - amount : total + amount
  firebase
    .firestore()
    .collection("history")
    .doc(data.uid)
    .update(dataNew)
    .then()
    .catch()
  firebase
    .firestore()
    .collection("wallet")
    .doc(data.uid)
    .update({ total: newTotal })
    .then()
    .catch()
  return data
}

function* getUserProfile(uid) {
  let data = {}
  yield firebase
    .firestore()
    .collection("profile")
    .doc(uid)
    .get()
    .then(function(querySnapshot) {
      data = querySnapshot.data()
    })
    .catch(error => console.log(error))
  return data
}

function* setUserProfile(data) {
  if (data.change) {
    const url = yield uploadImageAsync(data.data.avatar)
    yield (data.data.avatar = url)
  }
  yield firebase
    .firestore()
    .collection("profile")
    .doc(data.uid)
    .set(data.data)
    .then()
    .catch(error => {})
  return data.data
}

function* uploadImageAsync(uri) {
  const blob = yield new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      resolve(xhr.response)
    }
    xhr.onerror = function(e) {
      console.log(e)
      reject(new TypeError("Network request failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })
  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4())
  const snapshot = yield ref.put(blob)
  blob.close()
  return yield snapshot.ref.getDownloadURL()
}

function* loginWithEmail(data) {
  let responseLogin = {}
  yield firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(response => {
      responseLogin = { status: "success", uid: response.user.uid }
    })
    .catch(error => {
      responseLogin = { status: "failed", message: error.message }
    })
  return responseLogin
}

function* registrationWithEmail(data) {
  let responseRegistration = {}
  let { email, password, rePassword } = data

  if (password != "" && password === rePassword) {
    yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        responseRegistration = {
          status: "success",
          uid: response.user.uid,
          email: email,
          password: password
        }
      })
      .catch(error => {
        responseRegistration = { message: error.message, status: "failed" }
      })
  } else {
    responseRegistration = {
      message: "Incorrect Password",
      status: "failed"
    }
  }

  return responseRegistration
}

function* addDataNewUser(uid) {
  let defaultDataHistory = Object.assign({}, { data: [] })
  let defaultDataProfile = Object.assign(
    {},
    {
      address: "",
      avatar: "",
      dob: "01/01/2019",
      nameDisplay: "User",
      occupations: "",
      sex: "Male",
      tel: ""
    }
  )
  let defaultWallet = Object.assign({}, { total: 0 })
  yield firebase
    .firestore()
    .collection("history")
    .doc(uid)
    .set(defaultDataHistory)
    .then()
    .catch()
  yield firebase
    .firestore()
    .collection("profile")
    .doc(uid)
    .set(defaultDataProfile)
    .then()
    .catch()
  yield firebase
    .firestore()
    .collection("wallet")
    .doc(uid)
    .set(defaultWallet)
    .then()
    .catch()

  return
}

export const Api = {
  getCategoryFromFireBase,
  addCategory,
  editCategory,
  deleteCategory,
  fetchWalletUser,
  fetchHistoryUser,
  addTransaction,
  getUserProfile,
  setUserProfile,
  loginWithEmail,
  registrationWithEmail,
  addDataNewUser
}
