import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCo_e92DuibnIwKW_jOzA59SEaXc3hXbjo",
  authDomain: "employee-management-3f432.firebaseapp.com",
  projectId: "employee-management-3f432",
  storageBucket: "employee-management-3f432.firebasestorage.app",
  messagingSenderId: "966393846567",
  appId: "1:966393846567:web:bd2be2030d30a6d649e702",
  measurementId: "G-HT7Y6LMX4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth