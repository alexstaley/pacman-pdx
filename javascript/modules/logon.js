//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial
//https://www.youtube.com/watch?v=iKlWaUszxB4
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyApTQ82sxHdB4w0d5JVcfnu3lpbLI9qJPY",
  authDomain: "pacman-91374.firebaseapp.com",
  projectId: "pacman-91374",
  storageBucket: "pacman-91374.appspot.com",
  messagingSenderId: "571540195753",
  appId: "1:571540195753:web:ad4736b7c7b96aa1955cb8",
  measurementId: "G-CC2D61S2ZD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let test = document.getElementById("playerFrame");
if (test != null) {
  test.innerHTML = "New Player";
}

function onSignIn(googleUser) {
  window.alert("worked");
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log("Given Name:" + profile.getGivenName());
  window.alert("Given Name: ", profile.getGivenName());
  let playerName = document.getElementById("playerFrame");
  if (playerName != null) {
    playerName.innerHTML = profile.getGivenName();
  }
}
function logon() {}
function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  window.alert("it worked!");
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}
