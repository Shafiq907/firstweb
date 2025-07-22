// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2tkaajsK2d0eY6lXztK5nMpI8gVY3Vbg",
  authDomain: "gibs-login-system.firebaseapp.com",
  databaseURL: "https://gibs-login-system-default-rtdb.firebaseio.com",
  projectId: "gibs-login-system",
  storageBucket: "gibs-login-system.appspot.com",
  messagingSenderId: "1065767063573",
  appId: "1:1065767063573:web:42a7373ae0e7fff770fe1c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// SIGNUP FUNCTION
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    alert("Please fill all fields!");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save role in database
      firebase.database().ref("users/" + user.uid).set({
        email: email,
        role: role
      });

      alert("Signup successful!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
