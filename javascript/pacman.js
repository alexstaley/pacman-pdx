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
  getCloudsList,
  containsWall,
  getRandomHeading,
} from "./modules/maps.js";

const COIN_POINTS = 10; // When Pac-Man picks up a coin
const BEER_POINTS = 50; // When Pac-Man picks up a beer
const ROSE_POINTS = 100; // When Pac-Man picks up a rose
const CLOUD_POINTS = 200; // When Pac-Man eats a cloud
const STARTING_LIVES = 3; // Number of extra lives Pac-Man starts with
const DRUNK_TIME = 600; // Number of ticks Pac-Man spends drunk (60 ticks/second)

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

// Create sprites and track coins and clouds
let characterList = createSprites(grid, window.innerWidth);
let coinsList = getCoinRegistry(grid);
let cloudsList = getCloudsList(characterList);

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

// Declare game variables
let pacman = characterList["1-1"]; // TODO: Find pacman wherever he happens to be on the map, instead of hard-coding coords
let delta = 0;
let levelPassed = false;
let score = 0;
let extraLives = STARTING_LIVES;
let drunkDelta = 0;

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

// TICKER
app.ticker
  .add(move)
  .add(getCoins)
  .add(getRoses)
  .add(getBeers)
  .add(collideWithCloud);

/* Move the character in the direction it's facing
 */
function move() {
  // Move Pac-Man forward, update grid coords & drunk status
  pacman.moveOn(grid, app.renderer.screen);
  pacman.resetGridCoords(app.renderer.screen);
  if (pacman.drunk) {
    drunkDelta -= 1;
    console.log(drunkDelta);
    if (drunkDelta == 0) {
      pacman.soberUp();
    }
  }

  // Check for walk-thru-walls bug
  if (containsWall(grid, pacman.row, pacman.col)) {
    pacman.backUp();
  }

  // Move clouds forward and update grid coords
  cloudsList.forEach((cloud) => {
    cloud.moveOn(grid, app.renderer.screen);
    cloud.resetGridCoords(app.renderer.screen);
    if (
      !cloud.pathWrapsAround(app.renderer.screen) &&
      !cloud.hasAClearPath(grid)
      // TODO: Implement cloud turning when there is a turn (not high priority)
    ) {
      cloud.heading = getRandomHeading();
    }
  });
}

/* Pick up coins. Coins become invisible, and the score and
 * coinsList are updated. Check if the level has ended.
 */
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

/* Pick up rose tokens. Roses become invisible, and the score is updated.
 */
function getRoses() {
  let cell = `${pacman.row}-${pacman.col}`;
  if (
    characterList[cell] &&
    characterList[cell].sprite.visible &&
    (characterList[cell].name == "rose" ||
      characterList[cell].name == "rose-yellow" ||
      characterList[cell].name == "rose-pink" ||
      characterList[cell].name == "rose-gold" ||
      characterList[cell].name == "rose-brown" ||
      characterList[cell].name == "rose-white")
  ) {
    // Pick up the rose and update score
    characterList[cell].sprite.visible = false;
    score += ROSE_POINTS;
    // TODO: Differentiate between rose colors. Store roses (and do what with them?) as in O.G. Pac-Man.
  }
}

/* Pick up beer tokens. Beers become invisible, Pacman becomes drunk and clouds become edible.
 */
function getBeers() {
  let cell = `${pacman.row}-${pacman.col}`;
  if (
    characterList[cell] &&
    characterList[cell].sprite.visible &&
    characterList[cell].name == "beer"
  ) {
    // FIXME: Drinks beer even after it's already been drank
    characterList[cell].sprite.visible = false;
    score += BEER_POINTS;
    pacman.drunk = true;
    drunkDelta = DRUNK_TIME;
    // pacman.sprite.texture = "../Images/pacman-drunk-open-right.jpg";
    // TODO: Texture loading for drunk pacman image
  }
}

/* Check the position of each cloud to determine
 * if any of them are in contact with Pac-Man
 */
function collideWithCloud() {
  cloudsList.forEach((cloud) => {
    if (pacman.isTouching(cloud)) {
      if (pacman.drunk) {
        cloud.sprite.visible = false;
        score += CLOUD_POINTS * pacman.cloudMultiplier;
        pacman.cloudMultiplier *= 2;
      } else {
        extraLives -= 1;
        if (extraLives < 0) {
          // TODO: Kill game loop
        }
        // TODO: Move pacman back to starting position without changing the state of other sprites
      }
    }
  });
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
function createSprites(initMap, windowWidth) {
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
        case TileIndices.CLOUD:
          let cloud = new Character(
            TileImages.CLOUD,
            canvas,
            windowWidth,
            r,
            c
          );
          app.stage.addChild(cloud.sprite);
          characters[`${r}-${c}`] = cloud;
          break;
      }
    }
  }
  return characters;
}
