// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVzT2RQI4xglXFE1pAkt1QaXReAhqJ5PE",
  authDomain: "medium-b4b96.firebaseapp.com",
  projectId: "medium-b4b96",
  storageBucket: "medium-b4b96.appspot.com",
  messagingSenderId: "401789496572",
  appId: "1:401789496572:web:6ff404899da07038177b79",
  measurementId: "G-WYVHX8D647"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {
    app
}