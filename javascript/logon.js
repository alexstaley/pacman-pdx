//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial
//https://www.youtube.com/watch?v=iKlWaUszxB4

function logon() {
  var userEmail = document.getElementById("emailName").value;
  var userPassword = document.getElementById("passwordName").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    // .then((userCredential) => {
    // Signed in
    //   var user = userCredential.user;
    // ...
    //  })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error: ", errorMessage);
    });
}

function createAccount(userEmail, userPassword) {
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
