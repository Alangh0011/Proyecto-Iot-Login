import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnWdiXSuLA_xGrAk5jAVr8_CmtZXDEOoU",
  authDomain: "login-545d3.firebaseapp.com",
  projectId: "login-545d3",
  storageBucket: "login-545d3.appspot.com",
  messagingSenderId: "21821707710",
  appId: "1:21821707710:web:fbc2e46470b8403314d5ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);