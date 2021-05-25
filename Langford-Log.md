# Installed custom logos.

1. Attempted to use a photo for the name "Pacman" but that was not successful.
2. Went to https://icomoon.io/app/#/select and created a font-type and loaded into css files.
3. Created index.css for the login page. Each letter for "Pacman" takes 4 css styles that are framed
   inside of a span. Kind of like stacking each style on-top of each other.

# Created index.html & index.css

1). created intex html that will hold buttons to logon or just take you to game play. In game play you do not get to save your high-scores.
2). index.css has all the styles for the pacman letters. This takes four span elements to make the different colors, shapes and styles for the letter to look correct.

# Installed Firebase

1. Created firebase.js with all firebase configurations from firebase
2. created a login.js for the function call when login is pressed from index.html.
3. attempted to do defer src = login.js, and assign onClick inside of index.html assign "SignIn".
4. Received SignIn() error, not defined. It also changed the look of the page for some reason.
5. Installed firebase to root folder.
6. Attempted to move the script link to inside the body, still does not see "Logon()" as a function.
7. Installed firebase admin install packge
8. Added firebase scripts from firebase website for website logon.
9. Added script for firebase auth 8.6.2 and it now is operable.
10. Added a logout function for future features.
