// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-videosapp-f521e.firebaseapp.com",
  databaseURL: "https://fir-videosapp-f521e-default-rtdb.firebaseio.com",
  projectId: "fir-videosapp-f521e",
  storageBucket: "fir-videosapp-f521e.appspot.com",
  messagingSenderId: "925281307805",
  appId: "1:925281307805:web:c3ccd53b38f1aa47c1d874",
  measurementId: "G-38FG68DZGH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
