import { Character } from "./modules/sprites.js";
import { keyboard } from "./modules/keyboard.js";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  TileIndices,
  TileImages,
  drawBackground,
} from "./modules/maps.js";

let world = document.getElementById("world");
let board = document.getElementById("gameboard");
let grid = selectRandomMap();

function selectRandomMap() {
  // TODO: Make more maps, then implement me
  return map1;
}

// Render background (logs, thorns, ground, decor/roses) in DOM
drawBackground(grid);

// Create pixiJS application using 'gameboard' canvas
const app = new PIXI.Application({
  view: board,
  width: world.offsetWidth,
  height: world.offsetHeight,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  transparent: true,
});

// Add array of sprite tokens from the given map
let characterList = createSpritesAccordingTo(grid, window.innerWidth);

// Watch for window resize
window.addEventListener("resize", () => {
  // Resize and remeasure canvas
  app.renderer.resize(world.offsetWidth, world.offsetHeight);

  // Resize and replace sprites
  characterList.forEach((character) => {
    character.resizeSprite(window.innerWidth);
    character.replaceSprite(app.renderer.screen);
  });
});

// Enter game loop
let pacman = characterList[2];
let delta = 0;
console.log(pacman.name);

let upKey = keyboard("ArrowUp");
let downKey = keyboard("ArrowDown");
let leftKey = keyboard("ArrowLeft");
let rightKey = keyboard("ArrowRight");

upKey.press = () => {
  pacman.turnSprite("up");
};
downKey.press = () => {
  pacman.turnSprite("down");
};
leftKey.press = () => {
  pacman.turnSprite("left");
};
rightKey.press = () => {
  pacman.turnSprite("right");
};

app.ticker.add(move);

/* Move the character in the direction it's facing
 */
function move() {
  // Move forward and update grid coords
  pacman.moveOn(grid);
  pacman.resetGridCoords(app.renderer.screen);
}

/* Load Pac-Man mouth animation (if you can get graphics working...)
 */
function mouth() {
  delta += 0.1;
  pacman.sprite.getChildAt(0).clear();
  // pacman.sprite.getChildAt(0).destroy();
  pacman.animateMouth(delta);
}

/* Initialize sprites according to the given map array.
 * Returns an array of character objects.
 */
function createSpritesAccordingTo(initMap, windowWidth) {
  let characters = [];
  let canvas = app.renderer.screen;
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case TileIndices.PAC_MAN:
          let pacman = new Character(
            TileImages.PAC_MAN,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(pacman.sprite);
          characters.push(pacman);
          break;
        case TileIndices.COIN:
          let coin = new Character(TileImages.COIN, canvas, windowWidth, r, c);
          app.stage.addChild(coin.sprite);
          characters.push(coin);
          break;
        case TileIndices.BEER:
          let beer = new Character(TileImages.BEER, canvas, windowWidth, r, c);
          app.stage.addChild(beer.sprite);
          characters.push(beer);
          break;
      }
    }
  }
  return characters;
}
