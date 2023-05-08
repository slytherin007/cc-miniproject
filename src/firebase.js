import firebase from "firebase/app";
import  "firebase/auth";

export const auth=firebase.initializeApp( {
  apiKey: "AIzaSyCdAFZANKR8v0GxCKGVbjbYcoVnSsOMKfo",
  authDomain: "unichat-88d63.firebaseapp.com",
  projectId: "unichat-88d63",
  storageBucket: "unichat-88d63.appspot.com",
  messagingSenderId: "913810127198",
  appId: "1:913810127198:web:0609b54adb559782f2f7cf"
}).auth();

