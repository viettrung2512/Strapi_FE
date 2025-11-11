// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFR2MfZm9ISzqkeIvdjH5i7AXpPfMapfA",
  authDomain: "strapi-8145e.firebaseapp.com",
  projectId: "strapi-8145e",
  storageBucket: "strapi-8145e.firebasestorage.app",
  messagingSenderId: "740545082371",
  appId: "1:740545082371:web:345baa3d96f333d329ca36",
  measurementId: "G-CLMJ49P8CY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore(app);
