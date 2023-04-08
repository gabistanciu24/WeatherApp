// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8ruMdRyx1neWDytBTIRpPfPDfEuMBJv0",
  authDomain: "weatherapp-1365d.firebaseapp.com",
  projectId: "weatherapp-1365d",
  storageBucket: "weatherapp-1365d.appspot.com",
  messagingSenderId: "618724246098",
  appId: "1:618724246098:web:a336edafead6a55205558b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp.firestore();
