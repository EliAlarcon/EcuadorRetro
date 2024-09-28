import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-s8B5RO5bK23_3bJAo3aYo2E8pUB3_R4",
  authDomain: "ecuadroretro.firebaseapp.com",
  projectId: "ecuadroretro",
  storageBucket: "ecuadroretro.appspot.com",
  messagingSenderId: "773411812240",
  appId: "1:773411812240:web:67fdd8921678d6cb4e3915",
  databaseURL: "https://ecuadroretro-default-rtdb.firebaseio.com",
};

const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);

export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);