// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { useStateValue } from "./StateProvider";
const firebaseConfig = {
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
firebase.analytics();
const auth = firebase.auth();

function Logon() {
  const [{}, dispatch] = useStateValue();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    })
    .catch((error) => alert(error.message));
}
