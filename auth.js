import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2tkaajsK2d0eY6lXztK5nMpI8gVY3Vbg",
  authDomain: "gibs-login-system.firebaseapp.com",
  projectId: "gibs-login-system",
  storageBucket: "gibs-login-system.appspot.com",
  messagingSenderId: "1065767063573",
  appId: "1:1065767063573:web:42a7373ae0e7fff770fe1c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const role = signupForm.role.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        set(ref(db, 'users/' + userCredential.user.uid), {
          email,
          role
        }).then(() => {
          alert("Signup successful!");
          window.location.href = "login.html";
        });
      })
      .catch((error) => alert(error.message));
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        get(child(ref(db), 'users/' + uid)).then((snapshot) => {
          if (snapshot.exists()) {
            const role = snapshot.val().role;
            if (role === "superadmin") {
              window.location.href = "super-admin.html";
            } else if (role === "admin") {
              window.location.href = "admin.html";
            } else {
              window.location.href = "user-dashboard.html";
            }
          }
        });
      })
      .catch((error) => alert(error.message));
  });
}

window.logout = function() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
}

// Admin Add Bus
const busForm = document.getElementById("busForm");
if (busForm) {
  busForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = busForm.city.value;
    const company = busForm.company.value;
    const time = busForm.time.value;
    const fare = busForm.fare.value;
    const location = busForm.location.value;

    const busRef = ref(db, 'busData/' + city);
    push(busRef, {
      company,
      time,
      fare,
      location
    }).then(() => {
      alert("Bus Added!");
      busForm.reset();
    });
  });
}
