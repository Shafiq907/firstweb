const firebaseConfig = {
  apiKey: "AIzaSyB2tkaajsK2d0eY6lXztK5nMpI8gVY3Vbg",
  authDomain: "gibs-login-system.firebaseapp.com",
  projectId: "gibs-login-system",
  storageBucket: "gibs-login-system.appspot.com",
  messagingSenderId: "1065767063573",
  appId: "1:1065767063573:web:42a7373ae0e7fff770fe1c",
  databaseURL: "https://gibs-login-system-default-rtdb.firebaseio.com"
};
firebase.initializeApp(firebaseConfig);

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user;
    return firebase.database().ref("users/" + user.uid).set({
      email: email,
      role: role
    });
  }).then(() => {
    alert("Signup successful!");
    window.location.href = "login.html";
  }).catch((error) => {
    alert(error.message);
  });
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user;
    return firebase.database().ref("users/" + user.uid).once("value");
  }).then((snapshot) => {
    const role = snapshot.val().role;
    if (role === "superadmin") {
      window.location.href = "super-admin.html";
    } else if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user-dashboard.html";
    }
  }).catch((error) => {
    alert(error.message);
  });
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
