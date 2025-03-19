import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD8GOdPucq4LGy8eEy4qJ5jOIi5q1juUuw",
    authDomain: "voxtune-info340-wi25.firebaseapp.com",
    projectId: "voxtune-info340-wi25",
    storageBucket: "voxtune-info340-wi25.firebasestorage.app",
    messagingSenderId: "1046894337204",
    appId: "1:1046894337204:web:ff4389cb3f72a003750be1",
    measurementId: "G-4PBJPT7H33"
  };


const app = initializeApp(firebaseConfig);

// Get Storage and Firestore instances
export const storage = getStorage(app);
export const db = getFirestore(app); 