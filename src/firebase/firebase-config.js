import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCCUcRSRUdF4sc0806j1La-tSJLMDJOjz8",
    authDomain: "oxigenolandia.firebaseapp.com",
    projectId: "oxigenolandia",
    storageBucket: "oxigenolandia.appspot.com",
    messagingSenderId: "938183345568",
    appId: "1:938183345568:web:95f719117fe379045a90c5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}