// Import the necessary modules from Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCYphf45xY0SiBLke14PWDRuBjWFUyZZ9E",
  authDomain: "betapt-ae71e.firebaseapp.com",
  databaseURL: "https://betapt-ae71e-default-rtdb.firebaseio.com",
  projectId: "betapt-ae71e",
  storageBucket: "betapt-ae71e.appspot.com",
  messagingSenderId: "489960230730",
  appId: "1:489960230730:web:467cecbf19a34b87677bb3",
  measurementId: "G-HCYW0DEB5F",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get the Realtime Database instance
export const database = getDatabase(app);
