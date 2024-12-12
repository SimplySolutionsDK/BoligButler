import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAJVflOHrP6arYoAjbXMQvumBCxfAmsQsI",
  authDomain: "simplyrent-d1847.firebaseapp.com",
  projectId: "simplyrent-d1847",
  storageBucket: "simplyrent-d1847.firebasestorage.app",
  messagingSenderId: "114531564188",
  appId: "1:114531564188:web:ef2c7255ccf14a8d3d8b59",
  measurementId: "G-99SC1RLTR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;