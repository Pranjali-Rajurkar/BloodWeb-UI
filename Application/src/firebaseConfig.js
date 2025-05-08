import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDtIN0CblYPTaSObxribRkju5JetyGM1qQ",
    authDomain: "bloodwebsite-763bc.firebaseapp.com",
    projectId: "bloodwebsite-763bc",
    storageBucket: "bloodwebsite-763bc.firebasestorage.app",
    messagingSenderId: "744505203320",
    appId: "1:744505203320:web:598ca600ebe76ea9ebab8d",
    measurementId: "G-K7LN9STBRJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
