import {app} from "./app.config.mjs";
import { getFirestore, doc, addDoc, setDoc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import * as novato from "../novato/novato.mjs"

export const db = getFirestore(app);

export async function setData(data) {
    try {
        return setDoc(doc(db, "database", `st-${novato.UUID()}`), data);
      } catch (error) {
        console.error(error);
        return undefined;
      }
}