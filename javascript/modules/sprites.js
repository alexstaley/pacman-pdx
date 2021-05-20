import { MAP_WIDTH, MAP_HEIGHT, TileImages, containsWall } from "./maps.js";

export class Character {
  constructor(img, canvas, row, col) {
    const texture = PIXI.Texture.from(img);
    this.sprite = new PIXI.Sprite(texture);
    this.img = img;
    this.name = img.slice(10, -4);
    // this.name == "rose-coin" || this.name == "beer"
    //   ? (this.canMove = false)
    //   : (this.canMove = true);
    this.row = row;
    this.col = col;
    // this.origRow = row;
    // this.origCol = col;
    this.heading = 0;
    this.replaceSprite(canvas);
    this.resizeSprite();
  }

  resizeSprite() {
    // Resize sprite
    this.sprite.width = 0.04 * window.innerWidth;
    this.sprite.height = 0.04 * window.innerWidth;

    // Shrink and adjust coins (if using pixi)
    if (this.img == TileImages.COIN) {
      this.sprite.anchor.x = -2;
      this.sprite.anchor.y = -1;
      this.sprite.height *= 0.25;
      this.sprite.width *= 0.25;
    }
  }

  getCurrentGridCoords(canvas) {
    return {
      col: Math.round((MAP_WIDTH * this.sprite.x) / canvas.width),
      row: Math.round((MAP_HEIGHT * this.sprite.y) / canvas.height),
    };
  }

  setGridCoords(row, col) {
    this.col = col;
    this.row = row;
  }

  calculateAndSetCurrentGridCoords(canvas) {
    this.col = Math.round((MAP_WIDTH * this.sprite.x) / canvas.width);
    this.row = Math.round((MAP_HEIGHT * this.sprite.y) / canvas.height);
  }

  replaceSprite(canvas) {
    this.sprite.x = canvas.width * (1 - (MAP_WIDTH - this.col) / MAP_WIDTH);
    this.sprite.y = canvas.height * (1 - (MAP_HEIGHT - this.row) / MAP_HEIGHT);
  }

  turnSprite(direction) {
    switch (direction) {
      case "up":
        this.heading = Math.PI / 2;
        break;
      case "down":
        this.heading = (3 * Math.PI) / 2;
        break;
      case "left":
        this.heading = Math.PI;
        break;
      case "right":
        this.heading = 0;
        break;
    }
  }

  wallToThe(direction, grid) {
    switch (direction) {
      case "up":
        return containsWall(grid, this.row - 1, this.col);
      case "down":
        return containsWall(grid, this.row + 1, this.col);
      case "left":
        return containsWall(grid, this.row, this.col - 1);
      case "right":
        return containsWall(grid, this.row, this.col + 1);
    }
    return false;
  }
}
