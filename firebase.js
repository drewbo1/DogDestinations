import * as firebase from 'firebase';
require('firebase/auth')

const config = {
    apiKey: "AIzaSyADjp3ZVLLGGh9WLenYD3p7fcW3XKewEEc",
    authDomain: "dog-destinations.firebaseapp.com",
    databaseURL: "https://dog-destinations.firebaseio.com",
    projectId: "dog-destinations",
    storageBucket: "dog-destinations.appspot.com",
    messagingSenderId: "319623885326",
    appId: "1:319623885326:web:7baec18765e37dffe9825f",
    measurementId: "G-BKT25P7YCV"
  };
  
  if(!firebase.apps.length) {

    firebase.initializeApp(config);
  }

auth = firebase.auth()
  export default firebase
  