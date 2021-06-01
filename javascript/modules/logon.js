//Used the following youtube video for help.
//Firebase Web Login - Firebase Web App Tutorial

//https://www.youtube.com/watch?v=iKlWaUszxB4
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
