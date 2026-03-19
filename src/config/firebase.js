import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBJwiWQoCg5_DHfONsdLS0jnYVaSfpzqqQ",
  authDomain: "timesync-auth-48008.firebaseapp.com",
  projectId: "timesync-auth-48008",
  storageBucket: "timesync-auth-48008.firebasestorage.app",
  messagingSenderId: "372345851747",
  appId: "1:372345851747:web:bbd7b860097713b8a4cd56",
  measurementId: "G-MJPFQRPRWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

// Configure Facebook Provider
export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");

export default app;
