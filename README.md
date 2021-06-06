# pacman-pdx

A Portland-themed implementation of the classic video game Pac-Man

Open _demo.html_ to see a list of all the glyphs in your font along with their codes/ligatures.

To use the generated font in desktop programs, you can install the TTF font. In order to copy the character associated with each icon, refer to the text box at the bottom right corner of each glyph in demo.html. The character inside this text box may be invisible; but it can still be copied. See this guide for more info: https://icomoon.io/#docs/local-fonts

You won't need any of the files located under the _demo-files_ directory when including the generated font in your own projects.

You can import _selection.json_ back to the IcoMoon app using the _Import Icons_ button (or via Main Menu → Manage Projects) to retrieve your icon selection.

## Logon Firebase Requirements

1. Install firebase to main directory

## PixiJS

Pixi is a tool that enables fast, smooth graphics rendering, with support for motion and animation. Run 'npm install pixi.js' to add it to dependencies.

Active tokens (Pac-Man, clouds, coins, roses, and beers) are rendered as objects of pixi's Sprite class, using seed images to create textures which are then used to create sprites. Passive tokens (timbers and thorns) are rendered as html elements.

## Sources

https://github.com/kittykatattack/learningPixi#readme was a valuable source during development, especially when coding keyboard input functionality.

https://www.youtube.com/watch?v=NcewaPfFR6Y was a helpful source for getting data from Firebase to be displayed in the leaderboard. 

### Image sources

- Log: https://www.pngitem.com/middle/JmbRim_firewood-forest-log-trapped-tree-wood-wood-log/
- Thorn: https://www.shutterstock.com/editor/image/set-vector-frames-vines-thorns-design-593265374
- Pac-Man: https://www.pinterest.com/pin/566890671836766861/
- Coins/Roses: https://www.pinterest.com/pin/275493702193311949/
- Beer: https://openclipart.org/detail/14854/beer-mug
- Clouds: http://clipart-library.com/clipart/BTgrp98Rc.htm

## Instructions to Run
- Clone https://github.com/alexstaley/pacman-pdx
- In VSCode, use LiveServer to open logon.html
- If domain is not localhost, change domain to localhost
- Sign in using google credentials (only login method that works as of this writing)
- Use on-screen arrow buttons or keyboard arrow keys to play Pac-Man