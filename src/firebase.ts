import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


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
export const firestore = getFirestore(app);
export const db = firestore;