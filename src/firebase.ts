// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn1zCqvkpCsVEreDwUEzuvT3LjLMu4iEo",
  authDomain: "myfikarplus.firebaseapp.com",
  databaseURL: "https://myfikarplus-default-rtdb.firebaseio.com",
  projectId: "myfikarplus",
  storageBucket: "myfikarplus.firebasestorage.app",
  messagingSenderId: "985905948898",
  appId: "1:985905948898:web:e7772783b75f860ac556bb",
  measurementId: "G-TG320PLS5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);