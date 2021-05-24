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
 * Returns an array of character objects.
 */
function createSpritesAccordingTo(initMap, windowWidth) {
  let characters = [];
  let staticSprites = {};
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
          staticSprites[`${r}-${c}`] = pacman;
          break;
        case TileIndices.COIN:
          let coin = new Character(TileImages.COIN, canvas, windowWidth, r, c);
          app.stage.addChild(coin.sprite);
          characters.push(coin);
          staticSprites[`${r}-${c}`] = coin;
          break;
        case TileIndices.BEER:
          let beer = new Character(TileImages.BEER, canvas, windowWidth, r, c);
          app.stage.addChild(beer.sprite);
          characters.push(beer);
          staticSprites[`${r}-${c}`] = beer;
          break;
      }
    }
  }
  // return characters;
  return staticSprites;
}
