import {app} from "./app.config.mjs";
import { getDatabase, ref, set, child, get, update, remove, orderByKey, query, startAfter, limitToFirst} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import * as novato from "../novato/novato.mjs"

export const db = getDatabase(app);

export function setData(route, data) {
    set(ref(db, "CES/" + route), data);
}

export async function getData(route) {
    const dbRef = ref(db);
    return await get(query(child(dbRef, `CES/${route || ''}`), orderByKey())).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return undefined;
        }
    }).catch((error) => {
        console.log(error);
        return null;
    });
}

export function removeData(route) {
    remove(ref(db, "CES/" + route));
}

export function updateData(route, newData) {
    const dbRef = ref(db);
    const updates = {};
    updates[`CES/${route}`] = newData;
    update(dbRef, updates);
}

export function saveUser(user) {
    const dbRef = ref(db);
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (!snapshot.exists()) {
            set(ref(db, "users/" + user.uid), {
                id: novato.ID(),
                uid: user.uid,
                uuid: novato.UUID(),
                time: novato.TIME(),
                date: novato.DATE(),
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                content: {},
                version: "ces_0.1v"
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}

export async function getDataPaged(route, last, pageSize) {
    const dbRef = ref(db);
    try {
        const snapshot = await get(
            query(
                child(dbRef, `CES/${route}`),
                orderByKey(),
                startAfter(String(last)),
                limitToFirst(pageSize)
            )
        );
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
