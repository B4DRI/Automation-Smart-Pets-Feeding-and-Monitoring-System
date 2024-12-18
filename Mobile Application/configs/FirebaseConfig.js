import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHJO1IEzlXd7hV_EXz8NCG0Hb7k8y_DFQ",
  authDomain: "pawtectorproject-6de91.firebaseapp.com",
  projectId: "pawtectorproject-6de91",
  storageBucket: "pawtectorproject-6de91.appspot.com",
  messagingSenderId: "294364458702",
  appId: "1:294364458702:web:9dd0d3862c66ad7367aa9f",
  measurementId: "G-X69EMNEE9V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (e) {
  if (e.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw e;
  }
}

export { auth };
export const storage = getStorage(app); 
export const firestore = getFirestore(app);