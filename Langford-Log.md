# Installed custom logos.

1. Attempted to use a photo for the name "Pacman" but that was not successful.
2. Went to https://icomoon.io/app/#/select and created a font-type and loaded into css files.
3. Created index.css for the login page. Each letter for "Pacman" takes 4 css styles that are framed
   inside of a span. Kind of like stacking each style on-top of each other.

# Created index.html & index.css

1). created intex html that will hold buttons to logon or just take you to game play. In game play you do not get to save your high-scores.
2). index.css has all the styles for the pacman letters. This takes four span elements to make the different colors, shapes and styles for the letter to look correct.

# created map arrays for different map layouts

1. created 8 different maps that are 19 x 19 arrays that should give you a differnt map if we do a random on loading the different maps. Need to decide on final size before setting the numbers since everything will depend on the design of the map.

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
11. wasted many hours (very late hours 3am) to resolve this issue.
12. I have beat my head against the wall with this one. I was able to log in, get username
and everything worked but now its giving me a error that i cannot trace down. Nothing that I am aware of changed for the logon. I stayed up all the way through the night and still no luck fixing this error. 
13. It is hard to tell if the website is reloading new or old data, cleared cashe, shut browsers, restarted server, still 
sometimes loads old code.
14. Code is now loadiing after completely dumping the entire .js file. I had to bring in each function one at a timme to find out what was causing the issue. I eliminated most of the other code that consisted of different type of logins. I had a username and password logon, google credential logon using the setting provided by firestore, and finally the one that worked. Only a few lines of code and much more seemless with my credentials
# Created Design for Game Window

1. set-up different divs to divide up the space in the window.
2. set all div properties to have viewport height and widths to accomodate the setting that were needed for the pixie to work. I could not change the relative settings and the viewport settings for the world or the gamebdoard. I had to work around this.
3. set all div properties to different colors and added borders so I could see the layouts. I also set opacity so that I could see what is overlapping what in the window.
4. utilized flex to allow items to change shape as window sizes change.
5. imported a bitwise text for the 1980's look
6. attempted to change text color to white, used text-decoration-color "white". did not work.
7. found out that the text is just color: white; this worked.
8. Having lots of difficulty getting blue controls to bottom of the screen. Not sure which element
   is stopping me from getting it to where it belongs.
9. Having trouble centering controller image. Have tried content-justified: center, align: center, text-align:center,

# Fonts old computer

1. downloaded from https://www.1001fonts.com/retro+computer-fonts.html
2. install bitwise font into font library.
3. put bitwise.tff into the fonts library so that it could be referenced by @fontface.
4. this font is just a 1980's type looking font, just for fun
5. had to change font to match other styling on the high scores page. Did not realize different fonts on all pages. Applying the same font for all pages "monospace"
