//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial
//https://www.youtube.com/watch?v=iKlWaUszxB4

function logon() {
  window.alert("entered Logon");
  var userEmail = document.getElementById("emailName").value;
  var userPassword = document.getElementById("passwordName").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)

    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.alert("inside of signInWithEmailAndPassword");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: ", errorMessage);
    });
}

function createAccount(userEmail, userPassword) {
  window.alert("inside of CreateAccount");
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: ", errorMessage);
      // ..
    });
}
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

function googleLog() {
  window.alert("inside of googleLog - Changed again");
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      window.alert("inside of .then");
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      // ...
    })
    .then((window.location = "pacman.html"))
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
