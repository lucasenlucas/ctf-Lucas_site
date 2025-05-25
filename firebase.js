import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Config hier...

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveScore(name, time) {
  await addDoc(collection(db, "scores"), {
    name,
    time,
    timestamp: new Date().toISOString()
  });
}

export async function getScores() {
  const querySnapshot = await getDocs(collection(db, "scores"));
  const scores = [];
  querySnapshot.forEach((doc) => scores.push(doc.data()));
  return scores.sort((a, b) => a.time - b.time);
}
