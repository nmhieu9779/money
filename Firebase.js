import * as firebase from "firebase"
import firestore from "firebase/firestore"

var config = {
  apiKey: "AIzaSyACnH3PpC6PAKN3viE2Js332j4wYzL3hBk",
  authDomain: "money-9779.firebaseapp.com",
  databaseURL: "https://money-9779.firebaseio.com",
  projectId: "money-9779",
  storageBucket: "money-9779.appspot.com",
  messagingSenderId: "665701688796"
}
firebase.initializeApp(config)

export default firebase
