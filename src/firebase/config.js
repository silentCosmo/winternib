// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLqxOlhX7vkQqxN6lJb9-Ws8tqCYak544",
  authDomain: "winternib.firebaseapp.com",
  projectId: "winternib",
  storageBucket: "winternib.appspot.com",
  messagingSenderId: "417939368029",
  appId: "1:417939368029:web:317ff86449996b5655c5b4",
  measurementId: "G-3ZY04M1NG5",
  databaseURL: "https://winternib-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app)
export const db = getDatabase(app)