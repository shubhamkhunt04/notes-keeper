import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA0b2GzNc8U8gOHZtgsyLtbjaIDURSrLCo",
    authDomain: "notes-keeper-b0cab.firebaseapp.com",
    projectId: "notes-keeper-b0cab",
    storageBucket: "notes-keeper-b0cab.appspot.com",
    messagingSenderId: "741056807610",
    appId: "1:741056807610:web:bf741dd9399e365c4f7883"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
