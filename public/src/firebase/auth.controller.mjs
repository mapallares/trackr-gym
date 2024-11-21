import * as firebase from "./app.config.mjs";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

export const auth = getAuth(firebase.app);

export function startSession(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

export async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}

export function signOut() {
    auth.signOut();
}

export async function signUpWithEmail(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.warn(user);
        return user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
    });
}

export async function signInWithEmail(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error.code;
    });
}

export async function updateUserProfile(fields) {
    return await updateProfile(auth.currentUser, fields).then(() => {
        return true;
    })
    .catch((error) => {
        return false;
    });
}

export async function updateUserPassword(newPassword) {
    return await updatePassword(auth.currentUser, newPassword).then(() => {
        return true;
    })
    .catch((error) => {
        return false;
    });
}