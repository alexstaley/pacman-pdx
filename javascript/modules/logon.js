//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial

//https://www.youtube.com/watch?v=iKlWaUszxB4
var userName;
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    location.assign("logon.html");
  });
}
function onSignIn(googleUser) {
  window.alert("Using onSignIn from html page script");
}
function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  userName = googleUser.getBasicProfile().getName();
  location.assign("pacman.html");
}

function onFailure(error) {
  console.log(error);
}
