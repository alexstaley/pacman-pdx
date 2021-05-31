//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial
//https://www.youtube.com/watch?v=iKlWaUszxB4

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    location.assign("logon.html");
  });
}
function onSuccess(googleUser) {
  window.alert("inside of success");
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  location.assign("pacman.html");
  return currentUser;
}
