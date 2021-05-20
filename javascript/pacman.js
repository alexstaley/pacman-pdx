import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  TileIndices,
  TileImages,
  drawBackground,
} from "./modules/maps.js";

import { Character } from "./modules/sprites.js";

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
let spritesList = createSpritesAccordingTo(map1);

// Watch for window resize
window.addEventListener("resize", () => {
  // Resize canvas
  app.renderer.resize(world.offsetWidth, world.offsetHeight);

  // Resize and replace sprites
  spritesList.forEach((character) => {
    character.resizeSprite();
    character.replaceSprite(app.renderer.screen);
  });
});

// Start game loop
// playGame();
let delta = 0;
// let pacman = app.stage.children[2];
let pacman = spritesList[2];
console.log(pacman.name);
app.ticker.add(floatVert).add(move);

function floatVert() {
  delta += 0.1;
  pacman.sprite.y += Math.sin(delta) * 0.15;
}
function move() {
  pacman.sprite.y += 1;
  pacman.calculateAndSetCurrentGridCoords(app.renderer.screen);
}

function createSpritesAccordingTo(initMap) {
  let sprites = [];
  let canvas = app.renderer.screen;
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case TileIndices.PAC_MAN:
          let pacman = new Character(TileImages.PAC_MAN, canvas, r, c);
          app.stage.addChild(pacman.sprite);
          sprites.push(pacman);
          break;
        case TileIndices.COIN:
          let coin = new Character(TileImages.COIN, canvas, r, c);
          app.stage.addChild(coin.sprite);
          sprites.push(coin);
          break;
        case TileIndices.BEER:
          let beer = new Character(TileImages.BEER, canvas, r, c);
          app.stage.addChild(beer.sprite);
          sprites.push(beer);
          break;
      }
    }
  }
  return sprites;
}
