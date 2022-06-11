import "firebase/firestore";
import "firebase/auth";


import firebase from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKpBRgOiEgLr39V12GPfZVDOXFgEsNhb0",
    authDomain: "react-curso-1fb23.firebaseapp.com",
    projectId: "react-curso-1fb23",
    storageBucket: "react-curso-1fb23.appspot.com",
    messagingSenderId: "482081666097",
    appId: "1:482081666097:web:29920e051947ffd6519110"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase

}