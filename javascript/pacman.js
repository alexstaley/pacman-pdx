import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  TileIndices,
  TileImages,
  drawBackground,
} from "./modules/maps.js";

import {
  getCurrentGridCoords,
  getOriginalGridCoords,
  resizeSprite,
  replaceSprite,
  generateSprite,
  replaceSpriteInMotion,
} from "./modules/sprites.js";

let world = document.getElementById("world");
let board = document.getElementById("gameboard");

// Render background (logs, thorns, ground, decor/roses) in DOM
drawBackground(map1);

// Create pixiJS application using 'gameboard' canvas
const app = new PIXI.Application({
  view: board,
  width: world.offsetWidth,
  height: world.offsetHeight,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  transparent: true,
});

// Watch for window resize
window.addEventListener("resize", () => {
  // Resize canvas
  app.renderer.resize(world.offsetWidth, world.offsetHeight);

  // Resize and replace sprites
  let canvas = app.renderer.screen;
  let numSprites = app.stage.children.length;
  for (let i = 0; i < numSprites; ++i) {
    let sprite = app.stage.children[i];
    resizeSprite(sprite);

    // Sprites in motion get treated differently
    sprite.name.includes("pacman")
      ? replaceSpriteInMotion(sprite, canvas)
      : replaceSprite(sprite, canvas);
  }
});

// Add sprite tokens from the given map
createSpritesAccordingTo(map1);

// Start game loop
// playGame();
let delta = 0;
let pacman = app.stage.children[2];
console.log(pacman.name);
app.ticker.add(floatVert).add(move);

function floatVert() {
  delta += 0.1;
  pacman.y += Math.sin(delta) * 0.15;
}
function move() {
  pacman.y += 1;
  // getCurrentGridCoords(pacman, app.renderer.screen);
}

function createSpritesAccordingTo(initMap) {
  let sprites = {};
  let canvas = app.renderer.screen;
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case TileIndices.PAC_MAN:
          sprites.pacman = generateSprite(TileImages.PAC_MAN, canvas, r, c);
          app.stage.addChild(sprites.pacman);
          break;
        case TileIndices.COIN:
          sprites.coin = generateSprite(TileImages.COIN, canvas, r, c);
          app.stage.addChild(sprites.coin);
          break;
        case TileIndices.BEER:
          sprites.beer = generateSprite(TileImages.BEER, canvas, r, c);
          app.stage.addChild(sprites.beer);
          break;
      }
    }
  }
}
