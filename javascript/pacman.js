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

// Add sprite tokens (pacman, beer, coin/roses, ghost/clouds)
addSprites(map1);

// Start game loop
// playGame();

function addSprites(initMap) {
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case TileIndices.PAC_MAN:
          addSprite(TileImages.PAC_MAN, r, c);
          break;
        case TileIndices.COIN:
          addSprite(TileImages.COIN, r, c);
          break;
        case TileIndices.BEER:
          addSprite(TileImages.BEER, r, c);
          break;
      }
    }
  }
}

function addSprite(img, row, col) {
  const texture = PIXI.Texture.from(img);
  let sprite = new PIXI.Sprite(texture);
  let xCoord = app.renderer.width * (1 - (MAP_WIDTH - col) / MAP_WIDTH);
  let yCoord = app.renderer.height * (1 - (MAP_HEIGHT - row) / MAP_HEIGHT);

  sprite.x = xCoord;
  sprite.y = yCoord;
  sprite.width = 0.04 * window.innerWidth;
  sprite.height = 0.04 * window.innerWidth;
  if (img == TileImages.COIN) {
    sprite.anchor.x = -2;
    sprite.anchor.y = -1;
    sprite.height *= 0.25;
    sprite.width *= 0.25;
  }
  app.stage.addChild(sprite);

  let delta = 0;
  app.ticker.add(float);
  function float() {
    delta += 0.1;
    sprite.y += Math.sin(delta) * 0.1;
  }
}
