// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyAaAHoKlPXcY7rUmdC8PaZbvWQC2PnoFK4",
    authDomain: "todo-app-f6873.firebaseapp.com",
    projectId: "todo-app-f6873",
    storageBucket: "todo-app-f6873.appspot.com",
    messagingSenderId: "912919886178",
    appId: "1:912919886178:web:a869a0df5e4a7e93b5943b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();