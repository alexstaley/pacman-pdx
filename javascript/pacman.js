import { Character } from "./modules/sprites.js";
import { keyboard } from "./modules/keyboard.js";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  TileIndices,
  TileImages,
  drawBackground,
  getCoinRegistry,
} from "./modules/maps.js";

const COIN_POINTS = 100;

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

// Create sprites and track coins
let characterList = createSpritesAccordingTo(grid, window.innerWidth);
let coinsList = getCoinRegistry(grid);

// Watch for window resize
window.addEventListener("resize", () => {
  // Resize and remeasure canvas
  app.renderer.resize(world.offsetWidth, world.offsetHeight);

  // Resize and replace sprites
  for (let ch in characterList) {
    characterList[ch].resizeSprite(window.innerWidth);
    characterList[ch].replaceSprite(app.renderer.screen);
  }
});

// Enter game loop
let pacman = characterList["1-1"];
let delta = 0;
let levelPassed = false;
let score = 0;
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

app.ticker.add(move).add(getCoins);

/* Move the character in the direction it's facing
 */
function move() {
  // Move forward and update grid coords
  pacman.moveOn(grid);
  pacman.resetGridCoords(app.renderer.screen);
}

function getCoins() {
  let cell = `${pacman.row}-${pacman.col}`;
  if (coinsList[cell]) {
    // Pick up the coin and update ledgers
    characterList[cell].sprite.visible = false;
    coinsList[cell] = false;
    coinsList.totalValue -= 1;
    score += COIN_POINTS;
  }

  // Check if all coins have been picked up
  if (coinsList.totalValue < 1) {
    levelPassed = true;
  }
}

function collisionCheck() {
  // Check for sprite collision
  let aSprite = characterList.find((character) => {
    return (
      character.row == pacman.row &&
      character.col == pacman.col &&
      character.name != pacman.name
    );
  });
  if (pacman.isTouching(aSprite)) {
    console.log("Hit!");
  } else {
    console.log("Miss");
  }
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
 * Returns a container object of characters indexed by "{row}-{col}".
 */
function createSpritesAccordingTo(initMap, windowWidth) {
  let characters = {};
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
          characters[`${r}-${c}`] = pacman;
          break;
        case TileIndices.COIN:
          let coin = new Character(TileImages.COIN, canvas, windowWidth, r, c);
          app.stage.addChild(coin.sprite);
          characters[`${r}-${c}`] = coin;
          break;
        case TileIndices.BEER:
          let beer = new Character(TileImages.BEER, canvas, windowWidth, r, c);
          app.stage.addChild(beer.sprite);
          characters[`${r}-${c}`] = beer;
          break;
        case TileIndices.ROSE_RED:
          let roseRed = new Character(
            TileImages.ROSE_RED,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(roseRed.sprite);
          characters[`${r}-${c}`] = roseRed;
          break;
        case TileIndices.ROSE_YELLOW:
          let roseYellow = new Character(
            TileImages.ROSE_YELLOW,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(roseYellow.sprite);
          characters[`${r}-${c}`] = roseYellow;
          break;
        case TileIndices.ROSE_PINK:
          let rosePink = new Character(
            TileImages.ROSE_PINK,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(rosePink.sprite);
          characters[`${r}-${c}`] = rosePink;
          break;
        case TileIndices.ROSE_GOLD:
          let roseGold = new Character(
            TileImages.ROSE_GOLD,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(roseGold.sprite);
          characters[`${r}-${c}`] = roseGold;
          break;
        case TileIndices.ROSE_BROWN:
          let roseBrown = new Character(
            TileImages.ROSE_BROWN,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(roseBrown.sprite);
          characters[`${r}-${c}`] = roseBrown;
          break;
        case TileIndices.ROSE_WHITE:
          let roseWhite = new Character(
            TileImages.ROSE_WHITE,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(roseWhite.sprite);
          characters[`${r}-${c}`] = roseWhite;
          break;
      }
    }
  }
  return characters;
}
