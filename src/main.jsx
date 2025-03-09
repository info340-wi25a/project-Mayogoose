import React from 'react';
import ReactDOM from 'react-dom/client';

// Load custom css after bootstrap so that it can override bootstrap styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { BrowserRouter } from 'react-router'
import App from './components/pages/App.jsx'

// initialize the app
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8GOdPucq4LGy8eEy4qJ5jOIi5q1juUuw",
  authDomain: "voxtune-info340-wi25.firebaseapp.com",
  projectId: "voxtune-info340-wi25",
  storageBucket: "voxtune-info340-wi25.firebasestorage.app",
  messagingSenderId: "1046894337204",
  appId: "1:1046894337204:web:6612f4b737963d6c750be1",
  measurementId: "G-4J675J3005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // tell the app & its children what current urls are
    <BrowserRouter>
        <App />
    </BrowserRouter>
);