//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial
//https://www.youtube.com/watch?v=iKlWaUszxB4

let test = document.getElementById("playerFrame");
if (test != null) {
  test.innerHTML = "New Player";
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log("Given Name:" + profile.getGivenName());
  let playerName = document.getElementById("playerFrame");
  if (playerName != null) {
    playerName.innerHTML = profile.getGivenName();
  }
}

