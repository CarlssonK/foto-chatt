import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDX-53BG5evNPJlBzl0mMJo8XuZ1bSxEcg",
    authDomain:"foto-chatt.firebaseapp.com",
    projectId: "foto-chatt",
    storageBucket: "foto-chatt.appspot.com" ,
    messagingSenderId: "664715198061" ,
    appId: "1:664715198061:web:200f82eff3cfba41d74964"
  });

  export const auth = app.auth();
  export default app;