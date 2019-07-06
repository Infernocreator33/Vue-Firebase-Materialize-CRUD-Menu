import firebase from 'firebase'
import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDte-NbLWH9bKiUfIgi1YM319ylB_JbRRI",
    authDomain: "sexton-family-menu-8dadc.firebaseapp.com",
    databaseURL: "https://sexton-family-menu-8dadc.firebaseio.com",
    projectId: "sexton-family-menu-8dadc",
    storageBucket: "sexton-family-menu-8dadc.appspot.com",
    messagingSenderId: "359365178466",
    appId: "1:359365178466:web:b96931817ab0a0b7"
  };
  // Initialize Firebase
 
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots: true})
  //export firestore database

  export default firebaseApp.firestore()