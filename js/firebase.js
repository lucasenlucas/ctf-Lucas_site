// Firebase SDK's importeren
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Jouw Firebase-config
const firebaseConfig = {
  apiKey: "AIzaSyAy8srP8SwcCxtO8aftsHAMPXtQ2h2eTtk",
  authDomain: "lucas-ctf.firebaseapp.com",
  projectId: "lucas-ctf",
  storageBucket: "lucas-ctf.firebasestorage.app",
  messagingSenderId: "589499343713",
  appId: "1:589499343713:web:c0599f0ed4967397595b20"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Score opslaan
export async function saveScore(name, time) {
  await addDoc(collection(db, "scores"), {
    name,
    time,
    timestamp: new Date().toISOString()
  });
}

// Scoreboard ophalen
export async function getScores() {
  const snapshot = await getDocs(collection(db, "scores"));
  const scores = [];
  snapshot.forEach(doc => scores.push(doc.data()));
  return scores.sort((a, b) => a.time - b.time);
}
