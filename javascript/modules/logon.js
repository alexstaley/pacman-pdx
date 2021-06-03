//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial
//https://www.youtube.com/watch?v=iKlWaUszxB4

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   let currentPlayer = document.getElementById('playerFrame');
//   if(currentPlayer!=null)
//   {
//     currrentPlayer.innerHTML = profile.getName();
//   }
// }

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }

// Brian's logon.js changes
export var userName;
export function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    location.assign("logon.html");
  });
}

export function onFailure(error) {
  console.log(error);
}