import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCe0J18J22H4BtJVkSzoZd3Vt3x30JkK0A",
  authDomain: "sanket-major-project-2021.firebaseapp.com",
  projectId: "sanket-major-project-2021",
  storageBucket: "sanket-major-project-2021.appspot.com",
  messagingSenderId: "774560103435",
  appId: "1:774560103435:web:d803bdad9ca9ee4d03db0e",
  measurementId: "G-RLKGZTB7HF",
};

export const initializeFirebaseApp = () => initializeApp(firebaseConfig);

export const firestoreDb = () => getFirestore();
