import {
  MAP_WIDTH,
  MAP_HEIGHT,
  map1,
  TileIndices,
  TileImages,
  drawBackground,
} from "./maps.js";

// TODO: Refactor Sprite class

export function generateSprite(img, screen, row, col) {
  //Create sprite from img
  const texture = PIXI.Texture.from(img);
  let sprite = new PIXI.Sprite(texture);
  sprite.name = `${img}_${row}_${col}`;

  // Place sprite in starting square
  sprite.x = screen.width * (1 - (MAP_WIDTH - col) / MAP_WIDTH);
  sprite.y = screen.height * (1 - (MAP_HEIGHT - row) / MAP_HEIGHT);

  // Size and return sprite
  resizeSprite(sprite);
  return sprite;
}

export function getCurrentGridCoords(sprite) {
  // TODO: Implement me
  let row = 0;
  let col = 0;
  //   console.log(
  //     `Current: ${sprite.name}: x = ${sprite.x} y = ${sprite.y} row ${row} col ${col}`
  //   );
  return {
    col,
    row,
  };
}

export function getOriginalGridCoords(sprite) {
  // if sprite represents a pacman in row 4 and
  // column 12, then sprite.name == "pacman_4_12"
  const coords = sprite.name.match(/\d+/g);
  return {
    row: parseInt(coords[0]),
    col: parseInt(coords[1]),
  };
}

export function replaceSprite(sprite, canvWidth, canvHeight) {
  let coords = getOriginalGridCoords(sprite); //TODO: change to getCurrentGridCoords(sprite) when implemented
  sprite.x = canvWidth * (1 - (MAP_WIDTH - coords.col) / MAP_WIDTH);
  sprite.y = canvHeight * (1 - (MAP_HEIGHT - coords.row) / MAP_HEIGHT);
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
