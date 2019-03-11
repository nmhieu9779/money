// import * as firebase from "firebase"
import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/database"
import "@firebase/storage"
import firestore from "firebase/firestore"

var config = {
  apiKey: "AIzaSyACnH3PpC6PAKN3viE2Js332j4wYzL3hBk",
  authDomain: "money-9779.firebaseapp.com",
  databaseURL: "https://money-9779.firebaseio.com",
  projectId: "money-9779",
  storageBucket: "money-9779.appspot.com",
  messagingSenderId: "665701688796"
}

// const settings = { timestampsInSnapshots: false }

firebase.initializeApp(config)
// firebase.firestore().settings(settings)

export default firebase
