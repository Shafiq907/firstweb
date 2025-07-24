// Firebase App (Core SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// ✅ Firebase Config with databaseURL
const firebaseConfig = {
  apiKey: "AIzaSyBBAojU0U4T6Mxiju-IGRjePkZlynIu_Nc",
  authDomain: "gibsloginsys.firebaseapp.com",
  projectId: "gibsloginsys",
  storageBucket: "gibsloginsys.firebasestorage.app",
  messagingSenderId: "103609845193",
  appId: "1:103609845193:web:b5f2d468a1968d015a5418",
  databaseURL: "https://gibsloginsys-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// 🔹 Signup Function
window.signup = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    alert("Please fill in all fields!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // ✅ Save role in Realtime Database
      set(ref(database, "users/" + uid), {
        email: email,
        role: role
      });

      alert("Signup successful! Redirecting to login...");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Signup Error: " + error.message);
    });
};

// 🔹 Login Function
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      const dbRef = ref(database);

      // ✅ Get role from Realtime Database
      get(child(dbRef, "users/" + uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const role = snapshot.val().role;
            console.log("User Role: ", role);

            if (role === "superadmin") {
              window.location.href = "super-admin.html";
            } else if (role === "admin") {
              window.location.href = "admin.html";
            } else {
              window.location.href = "user-dashboard.html";
            }
          } else {
            alert("No user data found!");
          }
        })
        .catch((error) => {
          alert("Role Fetch Error: " + error.message);
        });
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
};

// 🔹 Logout Function
window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Logout Error: " + error.message);
    });
};
