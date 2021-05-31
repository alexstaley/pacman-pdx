import { Character } from "./modules/sprites.js";
import { keyboard } from "./modules/keyboard.js";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  map3,
  TileIndices,
  TileImages,
  drawBackground,
  getCoinRegistry,
  getCloudsList,
  containsWall,
  getRandomHeading,
  getPacManStartingCoords,
} from "./modules/maps.js";

const COIN_POINTS = 10; // Number of points awarded when Pac-Man picks up a coin
const BEER_POINTS = 50; // ...when Pac-Man picks up a beer
const ROSE_POINTS = 100; // ...when Pac-Man picks up a rose
const CLOUD_POINTS = 200; // ...when Pac-Man eats a cloud
const STARTING_LIVES = 3; // Number of extra lives Pac-Man starts with
const DRUNK_TIME = 420; // Number of ticks Pac-Man spends drunk (60 ticks/second)

let world = document.getElementById("world");
let board = document.getElementById("gameboard");
let playerScore = document.getElementById("scoreFrame");
let playerLives = document.getElementById("livesFrame");
let gameStatus = document.getElementById("gameStatus");
let endButton = document.getElementById("endButton");
let pauseButton = document.getElementById("pauseButton");
let grid = selectRandomMap();

function selectRandomMap() {
  // TODO: Make more maps, then implement me
  return map1;
}

// Render background (logs, thorns, ground cells) in DOM
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

  // Resize and replace sprites. Recalibrate speed.
  for (let ch in characterList) {
    characterList[ch].resizeSprite(window.innerWidth);
    characterList[ch].replaceSprite(app.renderer.screen);
    characterList[ch].resetSpeed(window.innerWidth);
  }
});

// Declare game variables
let state = ready;
let pacman = characterList[getPacManStartingCoords(grid)];
let delta = 0;
let drunkDelta = 0;
let score = 0;
let extraLives = STARTING_LIVES;
playerScore.innerHTML = "SCORE: " + score.toString();
playerLives.innerHTML = "LIVES: " + extraLives.toString();

// Define and listen for keyboard controls
let upKey = keyboard("ArrowUp");
let downKey = keyboard("ArrowDown");
let leftKey = keyboard("ArrowLeft");
let rightKey = keyboard("ArrowRight");

upKey.press = () => {
  if (state == play) {
    pacman.turnSprite("up");
  }
};
downKey.press = () => {
  if (state == play) {
    pacman.turnSprite("down");
  }
};
leftKey.press = () => {
  if (state == play) {
    pacman.turnSprite("left");
  }
};
rightKey.press = () => {
  if (state == play) {
    pacman.turnSprite("right");
  }
};

// TODO: Event listeners for on-screen control buttons
// buttons should call pacman.turnSprite() if game is
// in the "play" state, as above keyboard controls do

// Listen for pause/end button clicks
pauseButton.onclick = () => {
  // state = pause;
  switch (state) {
    case pause:
      gameStatus.innerHTML = "";
      state = play;
      break;
    case play:
      gameStatus.innerHTML = "(paused)";
      state = pause;
      break;
  }
};
endButton.onclick = () => {
  state = end;
};

// Open game loop (in 'ready' state)
app.ticker.add(gameLoop);
function gameLoop() {
  state();
}

/* Wait for 3 seconds, then transition to 'play' state
 */
function ready() {
  ++delta;
  if (delta > 180) {
    state = play;
    delta = 0;
    gameStatus.innerHTML = "";
  } else {
    gameStatus.innerHTML = `${Math.floor((180 - delta) / 60) + 1}`;
  }
}
function pause() {
  // Do nothing
}
function end() {
  // TODO: Send score to firebase, route user to leaderboard
}

/* Move Pac-Man back to starting location
 * and transition to 'ready' state
 */
function hit() {
  pacman.relocateTo(pacman.origRow, pacman.origCol, app.renderer.screen);

  // If a cloud occupies the respawn point, respawn
  // pacman at that cloud's original coordinates.
  cloudsList.forEach((cloud) => {
    if (cloud.isTouching(pacman)) {
      pacman.relocateTo(cloud.origRow, cloud.origCol, app.renderer.screen);
    }
  });
  state = ready;
}

/* Move sprites, handle interactions during normal gameplay state
 */
function play() {
  // TODO: Turn off "GO!" message after ~2 secs in play state
  move();
  getCoins();
  getRoses();
  getBeers();
  collideWithCloud();
}

/* Move the character in the direction it's facing
 */
function move() {
  // Move Pac-Man forward, update grid coords & drunk status
  pacman.moveOn(grid, app.renderer.screen);
  pacman.resetGridCoords(app.renderer.screen);
  if (pacman.drunk) {
    drunkDelta -= 1;
    if (drunkDelta <= 0) {
      pacman.soberUp();
      cloudsList.forEach((cloud) => {
        cloud.sprite.texture = PIXI.Texture.from(TileImages.CLOUD);
      });
    }
  }

  // Check for walk-thru-walls bug
  try {
    if (containsWall(grid, pacman.row, pacman.col)) {
      pacman.backUp();
    }
  } catch (error) {
    // Watch for out of bounds error from containsWall and hasAClearPath
    if (pacman.row > MAP_HEIGHT - 1) {
      pacman.relocateTo(0, pacman.col, app.renderer.screen);
    }
  }

  // Move clouds forward and update grid coords
  cloudsList.forEach((cloud) => {
    cloud.moveOn(grid, app.renderer.screen);
    cloud.resetGridCoords(app.renderer.screen);
    // Check for walk-thru-walls bug
    try {
      if (containsWall(grid, cloud.row, cloud.col)) {
        cloud.backUp();
        cloud.heading = getRandomHeading();
      }
      if (
        !cloud.pathWrapsAround(app.renderer.screen) &&
        !cloud.hasAClearPath(grid)
      ) {
        cloud.heading = getRandomHeading();
      }
    } catch (error) {
      // Watch for out of bounds error from containsWall and hasAClearPath
      if (cloud.row > MAP_HEIGHT - 1) {
        cloud.relocateTo(0, cloud.col, app.renderer.screen);
      }
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
    playerScore.innerHTML = "SCORE: " + score.toString();
  }

  // If all coins have been picked up, transition to 'end' state
  if (coinsList.totalValue < 1) {
    gameStatus.innerHTML = "YOU WIN!";
    state = end;
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
    playerScore.innerHTML = "SCORE: " + score.toString();
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
    characterList[cell].sprite.visible = false;
    score += BEER_POINTS;
    playerScore.innerHTML = "SCORE: " + score.toString();
    drunkDelta = DRUNK_TIME;
    pacman.getDrunk();
    cloudsList.forEach((cloud) => {
      cloud.sprite.texture = PIXI.Texture.from(TileImages.DRUNK_CLOUD);
    });
  }
}

/* Check the position of each cloud to determine
 * if any of them are in contact with Pac-Man
 */
function collideWithCloud() {
  cloudsList.forEach((cloud) => {
    if (pacman.isTouching(cloud)) {
      if (pacman.drunk) {
        // Pac-Man eats the cloud
        cloud.sprite.visible = false;
        score += CLOUD_POINTS * pacman.cloudMultiplier;
        playerScore.innerHTML = "SCORE: " + score.toString();
        pacman.cloudMultiplier *= 2;
        cloud.relocateTo(cloud.origRow, cloud.origCol, app.renderer.screen);
      } else {
        // The cloud eats Pac-Man
        state = hit;
        extraLives -= 1;
        if (extraLives < 0) {
          gameStatus.innerHTML = "GAME OVER";
          state = end;
        } else {
          playerLives.innerHTML = "LIVES: " + extraLives.toString();
        }
      }
    }
  });
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
