import {
  MAP_WIDTH,
  MAP_HEIGHT,
  Tiles,
  map1,
  map2,
  drawWorld,
} from "./modules/maps.js";

let board = document.getElementById("gameboard");
// drawWorld(map1);

const app = new PIXI.Application({
  view: board,
  width: window.innerWidth,
  height: window.innerHeight,
});

const TileImages = {
  GROUND: "../Images/ground.jpg",
  LOG_HORIZ: "../Images/log.png",
  LOG_VERT: "../Images/log.png",
  THORN_TOP_LEFT: "../Images/thorns-corner.jpg",
  THORN_TOP_RIGHT: "../Images/thorns-corner.jpg",
  THORN_BOTTOM_LEFT: "../Images/thorns-corner.jpg",
  THORN_BOTTOM_RIGHT: "../Images/thorns-corner.jpg",
  PAC_MAN: "../Images/pacman-open-right.jpg",
  COIN: "../Images/rose-coin.jpg",
  BEER: "../Images/pacman-beer.png",
};

loadWorld(map1);

// let pacman = new PIXI.Graphics();
// pacman.x = app.renderer.width / 2;
// pacman.y = app.renderer.height / 2;
// app.stage.addChild(pacman);

// app.ticker.add(hover);

// function hover() {}

function loadWorld(initMap) {
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case 10:
          // app.stage.addChild(generateTile(TileImages.GROUND, r, c));
          generateTile(TileImages.GROUND, r, c);
          break;
        case 11:
          // app.stage.addChild(generateTile(TileImages.LOG_HORIZ, r, c));
          generateTile(TileImages.LOG_HORIZ, r, c, 0, 1 / 3);
          break;
        case 12:
          // app.stage.addChild(generateTile(TileImages.LOG_VERT, r, c));
          generateTile(TileImages.LOG_VERT, r, c, Math.PI / 2, 1 / 3);
          break;
        case 13:
          // app.stage.addChild(generateTile(TileImages.THORN_TOP_LEFT, r, c));
          generateTile(TileImages.THORN_TOP_LEFT, r, c, (3 * Math.PI) / 2);
          break;
        case 14:
          // app.stage.addChild(generateTile(TileImages.THORN_TOP_RIGHT, r, c));
          generateTile(TileImages.THORN_TOP_RIGHT, r, c);
          break;
        case 15:
          // app.stage.addChild(generateTile(TileImages.THORN_BOTTOM_LEFT, r, c));
          generateTile(TileImages.THORN_BOTTOM_LEFT, r, c, Math.PI);
          break;
        case 16:
          //   app.stage.addChild(generateTile(TileImages.THORN_BOTTOM_RIGHT, r, c));
          generateTile(TileImages.THORN_BOTTOM_RIGHT, r, c, Math.PI / 2);
          break;
        case 20:
          //   app.stage.addChild(generateTile(TileImages.PAC_MAN, r, c));
          generateTile(TileImages.PAC_MAN, r, c);
          break;
        case 30:
          //   app.stage.addChild(generateTile(TileImages.COIN, r, c));
          generateTile(TileImages.COIN, r, c, 0, 1 / 4);
          break;
        case 37:
          //   app.stage.addChild(generateTile(TileImages.BEER, r, c));
          generateTile(TileImages.BEER, r, c);
      }
    }
  }
}

function generateTile(type, row, col, rotation = 0, squish = 1) {
  let tile = new PIXI.Container();
  tile.width = app.renderer.width / (MAP_WIDTH + 5);
  tile.height = app.renderer.width / (MAP_WIDTH + 5);

  let xCoord = app.renderer.width * (1 - (MAP_WIDTH - col) / MAP_WIDTH);
  let yCoord = app.renderer.width * (1 - (MAP_HEIGHT - row) / MAP_HEIGHT);
  let texture = PIXI.Texture.from(type);
  let img = new PIXI.Sprite(texture);

  img.width = app.renderer.width / (MAP_WIDTH + 5);
  img.height = app.renderer.width / (MAP_WIDTH + 5);

  if (type == TileImages.LOG_HORIZ || type == TileImages.LOG_VERT) {
    img.height *= squish;
  }
  if (type == TileImages.COIN) {
    img.height *= squish;
    img.width *= squish;
  }

  tile.position.set(xCoord, yCoord);
  tile.rotation = rotation;
  console.log(
    `(x, y) = (${tile.x}, ${tile.y})\n(w, h) = ${tile.width}, ${tile.height}`
  );

  tile.addChild(img);
  app.stage.addChild(tile);

  // const texture = PIXI.Texture.from(type);
  // let img = new PIXI.Sprite(texture);
  // let xCoord = app.renderer.width * (1 - (MAP_WIDTH - col) / MAP_WIDTH);
  // let yCoord = app.renderer.width * (1 - (MAP_HEIGHT - row) / MAP_HEIGHT);
  // img.width = app.renderer.width / (MAP_WIDTH + 5);
  // img.height = app.renderer.width / (MAP_WIDTH + 5);
  // if (type == TileImages.LOG_HORIZ || type == TileImages.LOG_VERT) {
  //   img.height *= squish;
  // }
  // if (type == TileImages.COIN) {
  //   img.height *= squish;
  //   img.width *= squish;
  // }
  // img.position.set(xCoord, yCoord);
  // img.rotation = rotation;
  // console.log(
  //   `(x, y) = (${img.x}, ${img.y})\n(w, h) = ${img.width}, ${img.height}`
  // );

  // app.stage.addChild(img);
}
