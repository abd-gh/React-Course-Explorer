// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqfqRqVr6jckKrYNAbWebKme5uHgu5e8c",
    authDomain: "course-explorer-cabcb.firebaseapp.com",
    projectId: "course-explorer-cabcb",
    storageBucket: "course-explorer-cabcb.appspot.com",
    messagingSenderId: "1056193443507",
    appId: "1:1056193443507:web:1b12d1dd699fd942d822c6",
    measurementId: "G-YFTNL0MLZL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);