// 19X19 array
export const MAP_WIDTH = 19;
export const MAP_HEIGHT = 19;

// THRESHOLD controls how close you can be to a wall before it stops you
export const THRESHOLD = 0.05;
export const TILE_WIDTH = 0.04 * window.innerWidth;

/* 'Enum' for indices in map array corresponding
 * to tokens used in map creation
 */
export const TileIndices = {
  GROUND: 10,
  LOG_HORIZ: 11,
  LOG_VERT: 12,
  THORN_TOP_LEFT: 13,
  THORN_TOP_RIGHT: 14,
  THORN_BOTTOM_LEFT: 15,
  THORN_BOTTOM_RIGHT: 16,
  PAC_MAN: 20,
  COIN: 30,
  ROSE_RED: 31,
  ROSE_YELLOW: 32,
  ROSE_PINK: 33,
  ROSE_GOLD: 34,
  ROSE_BROWN: 35,
  ROSE_WHITE: 36,
  BEER: 37,
  CLOUD: 40,
};

/* Container for images to use when creating
 * html elements and when naming sprites
 *
 *   IMAGE SOURCES:
 * Log: https://www.pngitem.com/middle/JmbRim_firewood-forest-log-trapped-tree-wood-wood-log/
 * Thorn: https://www.shutterstock.com/editor/image/set-vector-frames-vines-thorns-design-593265374
 * Pac-Man: //TODO
 * Coins/Roses: https://www.pinterest.com/pin/275493702193311949/
 * Beer: https://openclipart.org/detail/14854/beer-mug
 * Cloud: http://clipart-library.com/clipart/BTgrp98Rc.htm
 */
export const TileImages = {
  GROUND: "../Images/ground.jpg",
  LOG_HORIZ: "../Images/log.png",
  LOG_VERT: "../Images/log.png",
  THORN_TOP_LEFT: "../Images/thorns-corner.jpg",
  THORN_TOP_RIGHT: "../Images/thorns-corner.jpg",
  THORN_BOTTOM_LEFT: "../Images/thorns-corner.jpg",
  THORN_BOTTOM_RIGHT: "../Images/thorns-corner.jpg",
  PAC_MAN: "../Images/pacman-open-right.jpg",
  COIN: "../Images/rose-coin.jpg",
  ROSE_RED: "../Images/rose.jpg",
  ROSE_YELLOW: "../Images/rose-yellow.jpg",
  ROSE_PINK: "../Images/rose-pink.jpg",
  ROSE_GOLD: "../Images/rose-gold.jpg",
  ROSE_BROWN: "../Images/rose-brown.gif",
  ROSE_WHITE: "../Images/rose-white.jpg",
  BEER: "../Images/beer.png",
  CLOUD: "../Images/cloud.png",
};

/* Returns true if the given cell in
 * the given grid contains a wall
 */
export function containsWall(grid, row, col) {
  let cell = grid[row][col];
  return cell > TileIndices.GROUND && cell < TileIndices.PAC_MAN;
}

/* Returns an object containing all the coins
 * in a given map, indexed by their coords, as
 * well as the total number of coins on the map.
 */
export function getCoinRegistry(grid) {
  let coins = {};
  coins.totalValue = 0;
  for (let r = 0; r < MAP_WIDTH; ++r) {
    for (let c = 0; c < MAP_HEIGHT; ++c) {
      if (grid[r][c] == TileIndices.COIN) {
        coins[`${r}-${c}`] = true;
        coins.totalValue += 1;
      } else {
        coins[`${r}-${c}`] = false;
      }
    }
  }
  return coins;
}

/* Returns an array containing all the clouds in a given map.
 * Also makes all clouds face a randomly chosen direction.
 */
export function getCloudsList(characterList) {
  let clouds = [];
  for (let ch in characterList) {
    if (characterList[ch].name == "cloud") {
      characterList[ch].heading = getRandomHeading();
      clouds.push(characterList[ch]);
    }
  }
  return clouds;
}

/* Returns a random direction for a cloud to face
 */
export function getRandomHeading() {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return "up";
    case 1:
      return "down";
    case 2:
      return "left";
    case 3:
      return "right";
  }
}

/* Creates the background elements
 * in the DOM for the given map array
 */
export function drawBackground(initMap) {
  let world = document.getElementById("world");
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case TileIndices.GROUND:
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.LOG_HORIZ:
          world.innerHTML += `<div id="${r}_${c}" class='tile log'></div>`;
          break;
        case TileIndices.LOG_VERT:
          world.innerHTML += `<div id="${r}_${c}" class='tile log log-vert'></div>`;
          break;
        case TileIndices.THORN_TOP_LEFT:
          world.innerHTML += `<div id="${r}_${c}" class='tile thorns thorns-tl'></div>`;
          break;
        case TileIndices.THORN_TOP_RIGHT:
          world.innerHTML += `<div id="${r}_${c}" class='tile thorns'></div>`;
          break;
        case TileIndices.THORN_BOTTOM_LEFT:
          world.innerHTML += `<div id="${r}_${c}" class='tile thorns thorns-bl'></div>`;
          break;
        case TileIndices.THORN_BOTTOM_RIGHT:
          world.innerHTML += `<div id="${r}_${c}" class='tile thorns thorns-br'></div>`;
          break;
        case TileIndices.PAC_MAN:
          // Handle pacman token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.COIN:
          // Handle coin token w pixi??? Pretty sure yes, but leaving DOM option commented out for now
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          // world.innerHTML += `<div id="${r}_${c}" class='tile rose-coin'></div>`;
          break;
        case TileIndices.ROSE_RED:
          // Handle rose token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.ROSE_YELLOW:
          // Handle rose token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.ROSE_PINK:
          // Handle rose token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.ROSE_GOLD:
          // Handle rose token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.ROSE_BROWN:
          // Handle rose token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.ROSE_WHITE:
          // Handle rose token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.BEER:
          // Handle beer token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
        case TileIndices.CLOUD:
          // Handle cloud token w pixi
          world.innerHTML += `<div id="${r}_${c}" class='tile ground'></div>`;
          break;
      }
    }
    world.innerHTML += "<br>";
  }
}
export var map1 = [
  [13, 11, 11, 11, 11, 16, 30, 15, 11, 11, 11, 11, 16, 30, 15, 11, 11, 11, 14],
  [12, 20, 30, 30, 30, 30, 30, 30, 37, 30, 30, 30, 30, 30, 30, 30, 30, 30, 12],
  [12, 30, 13, 11, 14, 30, 13, 11, 11, 14, 30, 13, 11, 11, 11, 11, 14, 30, 12],
  [12, 30, 12, 33, 12, 30, 12, 34, 34, 12, 30, 12, 35, 35, 35, 35, 12, 30, 12],
  [12, 30, 15, 11, 16, 30, 15, 11, 11, 16, 30, 12, 35, 33, 33, 35, 12, 30, 12],
  [12, 30, 30, 30, 30, 40, 30, 30, 30, 30, 30, 12, 35, 35, 35, 35, 12, 30, 12],
  [12, 30, 13, 11, 11, 11, 14, 30, 13, 11, 11, 16, 13, 11, 11, 11, 16, 30, 12],
  [12, 30, 15, 11, 11, 11, 16, 30, 15, 11, 11, 11, 16, 30, 30, 30, 37, 30, 12],
  [12, 30, 30, 30, 30, 30, 30, 30, 13, 11, 11, 11, 14, 30, 13, 11, 11, 11, 16],
  [15, 11, 14, 30, 13, 11, 11, 11, 16, 10, 10, 10, 12, 30, 12, 10, 10, 10, 10],
  [13, 11, 16, 34, 15, 11, 11, 11, 11, 11, 11, 11, 16, 30, 15, 11, 11, 11, 14],
  [12, 30, 30, 30, 30, 30, 30, 30, 37, 30, 30, 30, 33, 40, 30, 30, 30, 30, 12],
  [16, 30, 13, 11, 14, 30, 13, 11, 11, 14, 30, 13, 11, 11, 11, 11, 14, 30, 15],
  [30, 37, 12, 10, 12, 30, 12, 10, 10, 12, 30, 12, 10, 10, 10, 10, 12, 30, 30],
  [14, 30, 15, 11, 16, 30, 15, 11, 11, 16, 30, 12, 10, 10, 10, 10, 12, 30, 13],
  [12, 40, 30, 30, 30, 30, 30, 30, 32, 30, 30, 12, 10, 10, 10, 10, 12, 30, 12],
  [12, 30, 13, 11, 11, 14, 40, 13, 11, 11, 11, 16, 13, 11, 11, 11, 16, 37, 12],
  [12, 30, 15, 11, 11, 16, 30, 15, 11, 11, 11, 11, 16, 30, 30, 30, 30, 30, 12],
  [15, 11, 11, 11, 11, 14, 30, 13, 11, 11, 11, 11, 14, 30, 13, 11, 11, 11, 16],
];

export var map2 = [
  [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
  [6, 4, 2, 2, 2, 2, 1, 2, 5, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [6, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [6, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
  [6, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [6, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [6, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 5, 2, 2, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10],
];

var map3 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var map4 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var map5 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var map6 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var map7 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var map8 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
