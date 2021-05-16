  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDnV8vsKxXp6E9bCFox20D0Vnp4YiqLaKU",
    authDomain: "newlnwza.firebaseapp.com",
    databaseURL: "https://newlnwza.firebaseio.com",
    projectId: "newlnwza",
    storageBucket: "newlnwza.appspot.com",
    messagingSenderId: "32127999168",
    appId: "1:32127999168:web:8d7b8b6c31dcea0a0c6125",
    measurementId: "G-N21PKLL5ET"
  };
  // Initialize Firebase

  const Firebase = {
    // auth
    loginWithEmail: (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signupWithEmail: (email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    signOut: () => {
      return firebase.auth().signOut()
    },
    checkUserAuth: user => {
      return firebase.auth().onAuthStateChanged(user)
    },
    passwordReset: email => {
      return firebase.auth().sendPasswordResetEmail(email)
    },
    // firestore
    createNewUser: userData => {
      return firebase
        .firestore()
        .collection('users')
        .doc(`${userData.uid}`)
        .set(userData)
    }
  }

  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true})

  export default firebase;