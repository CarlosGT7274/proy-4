// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZUnL-I7LWT6qySZNBcbvtKnMmyyN9ru4",
  authDomain: "resapp-c54fe.firebaseapp.com",
  projectId: "resapp-c54fe",
  storageBucket: "resapp-c54fe.appspot.com",
  messagingSenderId: "992928283363",
  appId: "1:992928283363:web:44cb325d8d5a41ed58a3d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
