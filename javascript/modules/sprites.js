import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  TileIndices,
  TileImages,
  drawBackground,
} from "./maps.js";

// TODO: Refactor Sprite class

export function generateSprite(img, canvas, row, col) {
  //Create sprite from img
  const texture = PIXI.Texture.from(img);
  let sprite = new PIXI.Sprite(texture);
  sprite.name = `${img}_${row}_${col}`;

  // Place sprite in starting square
  sprite.x = canvas.width * (1 - (MAP_WIDTH - col) / MAP_WIDTH);
  sprite.y = canvas.height * (1 - (MAP_HEIGHT - row) / MAP_HEIGHT);

  // Size and return sprite
  resizeSprite(sprite);
  return sprite;
}

export function getCurrentGridCoords(sprite, canvas) {
  // TODO: Test me
  let c = Math.round((MAP_WIDTH * sprite.x) / canvas.width);
  let r = Math.round((MAP_HEIGHT * sprite.y) / canvas.height);
  console.log(
    // `Current: ${sprite.name}: x = ${sprite.x} y = ${sprite.y} row ${r} col ${c}`
    `Current: ${sprite.name}: (r${r}, c${c})`
  );
  return {
    col: c,
    row: r,
    // col: Math.round((MAP_WIDTH * sprite.x) / canvas.width),
    // row: Math.round((MAP_HEIGHT * sprite.y) / canvas.height),
  };
}

export function getOriginalGridCoords(sprite) {
  // if sprite represents a pacman in row 4 and
  // column 12, then sprite.name == "../Images/pacman-open-right_4_12"
  const coords = sprite.name.match(/\d+/g);
  return {
    row: parseInt(coords[0]),
    col: parseInt(coords[1]),
  };
}

export function replaceSprite(sprite, canvas) {
  let coords = getOriginalGridCoords(sprite, canvas);
  sprite.x = canvas.width * (1 - (MAP_WIDTH - coords.col) / MAP_WIDTH);
  sprite.y = canvas.height * (1 - (MAP_HEIGHT - coords.row) / MAP_HEIGHT);
}

export function replaceSpriteInMotion(sprite, canvas) {
  let coords = getCurrentGridCoords(sprite, canvas);
  sprite.x = canvas.width * (1 - (MAP_WIDTH - coords.col) / MAP_WIDTH);
  sprite.y = canvas.height * (1 - (MAP_HEIGHT - coords.row) / MAP_HEIGHT);
}

export function resizeSprite(sprite) {
  // Resize sprite
  sprite.width = 0.04 * window.innerWidth;
  sprite.height = 0.04 * window.innerWidth;

  // Shrink and adjust coins (if using pixi)
  if (sprite.name.includes(TileImages.COIN)) {
    sprite.anchor.x = -2;
    sprite.anchor.y = -1;
    sprite.height *= 0.25;
    sprite.width *= 0.25;
  }
}
