/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDFR2MfZm9ISzqkeIvdjH5i7AXpPfMapfA",
  authDomain: "strapi-8145e.firebaseapp.com",
  projectId: "strapi-8145e",
  storageBucket: "strapi-8145e.firebasestorage.app",
  messagingSenderId: "740545082371",
  appId: "1:740545082371:web:345baa3d96f333d329ca36",
  measurementId: "G-CLMJ49P8CY",
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Lấy dịch vụ messaging
firebase.messaging();
