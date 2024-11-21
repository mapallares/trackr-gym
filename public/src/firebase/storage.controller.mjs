import {app} from "./app.config.mjs";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

export var storage = getStorage(app);

export async function uploadImage(file, filename) {
    var storageRef = ref(storage,"imagenes/" + filename);
    return await uploadBytes(storageRef, file).then((snapshot) => {
        return true;
    }).catch((error) => {
        console.error(error);
        return false;
    });
}

export async function deleteImage(filename) {
    var desertRef = ref(storage,"imagenes/" + filename);
    return await deleteObject(desertRef).then(() => {
        return true;
      }).catch((error) => {
        console.error(error);
        return false;
      });
}