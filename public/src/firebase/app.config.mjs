import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

export const firebaseConfig = {
  apiKey: "AIzaSyD3Xweulxp-yTKN3uKgHLl-JGK0IklgusY",
  authDomain: "authentication-app-e625b.firebaseapp.com",
  databaseURL: "https://authentication-app-e625b-default-rtdb.firebaseio.com",
  projectId: "authentication-app-e625b",
  storageBucket: "authentication-app-e625b.appspot.com",
  messagingSenderId: "618107072841",
  appId: "1:618107072841:web:832bd8f31891d36130ea98"
};

export const app = initializeApp(firebaseConfig);