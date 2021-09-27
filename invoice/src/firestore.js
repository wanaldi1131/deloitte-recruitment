import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyDII9u_UI7EE_cm7uLeMdY3m-BWqcMHYDs",

  authDomain: "deloitte-recruitment-te.firebaseapp.com",

  databaseURL: "https://deloitte-recruitment-te-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "deloitte-recruitment-te",

  storageBucket: "deloitte-recruitment-te.appspot.com",

  messagingSenderId: "984893712338",

  appId: "1:984893712338:web:982018feca8952f14f4a0b",
};
;

export const firebase = initializeApp(config);
export const db = getFirestore();