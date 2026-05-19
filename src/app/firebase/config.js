import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfel3qg_MqKR0Sg4t-1hOxFaNwm9jPrWA",
  authDomain: "tax-dashboard-db8ae.firebaseapp.com",
  projectId: "tax-dashboard-db8ae",
  storageBucket: "tax-dashboard-db8ae.firebasestorage.app",
  messagingSenderId: "868710244196",
  appId: "1:868710244196:web:30ae37de1eeb560145a471",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);