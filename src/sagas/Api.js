import firebase from "../../Firebase"

function* getCategoryFromFireBase() {
  var data = {}
  yield firebase
    .firestore()
    .collection("category")
    .get()
    .then(function(querySnapshot) {
      data = {
        category: querySnapshot.docs.map(item => ({
          data: item.data(),
          key: item.id
        })),
        listParentCategory: querySnapshot.docs.map(item => ({
          id: item.id,
          name: item.data().name
        }))
      }
    })
    .catch(error => console.log(error))
  return data
}

export const Api = {
  getCategoryFromFireBase
}
