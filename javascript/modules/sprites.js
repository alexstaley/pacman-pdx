import {
  MAP_WIDTH,
  MAP_HEIGHT,
  THRESHOLD,
  TILE_WIDTH,
  TileImages,
  containsWall,
} from "./maps.js";

/* A Character is a wrapper for a PIXI.Sprite object.
 * In addition to the sprite, it knows about the grid.
 */
export class Character {
  constructor(img, canvas, windowWidth, row, col) {
    this.img = img;
    this.name = img.slice(10, -4); // slices {name} from '../Images/{name}.png'
    this.row = row;
    this.col = col;
    this.origRow = row;
    this.origCol = col;
    this.xDiff = 0.0; // Difference between sprite's x-coord and the center of its column
    this.yDiff = 0.0; // Difference between sprite's y-coord and the center of its row
    this.heading = "right";
    this.drunk = false;
    this.cloudMultiplier = 1;

    const texture = PIXI.Texture.from(img);
    this.sprite = new PIXI.Sprite(texture);
    this.replaceSprite(canvas);
    this.resizeSprite(windowWidth);
    this.resetSpeed(windowWidth);
  }

  /* Reset the position of the sprite.
   * Used when initializing a sprite and resizing the screen.
   */
  replaceSprite(canvas) {
    this.sprite.x = canvas.width * (1 - (MAP_WIDTH - this.col) / MAP_WIDTH);
    this.sprite.y = canvas.height * (1 - (MAP_HEIGHT - this.row) / MAP_HEIGHT);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.xDiff = this.yDiff = 0.0;
  }

  /* Reset the size of the sprite.
   * Used when initializing a sprite and resizing the screen.
   */
  resizeSprite(windowWidth) {
    if (this.img == TileImages.COIN) {
      this.sprite.height = 0.01 * windowWidth;
      this.sprite.width = 0.01 * windowWidth;
    } else {
      this.sprite.width = 0.04 * windowWidth;
      this.sprite.height = 0.04 * windowWidth;
    }
  }

  resetSpeed(windowWidth) {
    if (this.img == TileImages.PAC_MAN || this.img == TileImages.CLOUD) {
      this.speed = Math.floor(windowWidth / 200);
    }
  }

  relocateTo(row, col, canvas) {
    this.row = row;
    this.col = col;
    this.replaceSprite(canvas);
  }

  /* If there is a clear path, move forward at speed
   */
  moveOn(grid, canvas) {
    if (this.pathWrapsAround(canvas) || this.hasAClearPath(grid)) {
      this.recenter();
      switch (this.heading) {
        case "up":
          this.sprite.y -= this.speed;
          break;
        case "down":
          this.sprite.y += this.speed;
          break;
        case "left":
          this.sprite.x -= this.speed;
          break;
        case "right":
          this.sprite.x += this.speed;
          break;
      }
    }
  }

  /* Reset the character's grid coords based on the sprite's position.
   * Moving characters should call this from within their ticker.
   */
  resetGridCoords(canvas) {
    // Calculate coords
    let col = (MAP_WIDTH * this.sprite.x) / canvas.width;
    let row = (MAP_HEIGHT * this.sprite.y) / canvas.height;

    // Assign rounded values and calculate difference
    this.col = Math.round(col);
    this.row = Math.round(row);
    this.xDiff = this.col - col; // how close we are to the center of that column
    this.yDiff = this.row - row; // how close we are to the center of that row

    // Check for wraparound path
    if (this.isCloseEnough()) {
      this.wrapAround(canvas);
    }
  }

  /* Adjust the sprite's position and grid coords to
   * reflect being on a path that wraps around the screen
   */
  wrapAround(canvas) {
    switch (this.heading) {
      case "up":
        if (this.row == 0) {
          this.sprite.y = canvas.height - TILE_WIDTH;
          this.row = MAP_HEIGHT - 1;
        }
        break;
      case "down":
        if (this.row == MAP_HEIGHT - 1) {
          this.sprite.y = 0;
          this.row = 0;
        }
        break;
      case "left":
        if (this.col == 0) {
          this.sprite.x = canvas.width - TILE_WIDTH;
          this.col = MAP_WIDTH - 1;
        }
        break;
      case "right":
        if (this.col == MAP_WIDTH - 1) {
          this.sprite.x = 0;
          this.col = 0;
        }
        break;
    }
  }

  /* Returns true if the character occupies
   * a cell on the map's edge (such cells
   * should wrap around to the opposite side
   * of the board)
   */
  pathWrapsAround() {
    return (
      this.row <= 0 ||
      this.row >= MAP_HEIGHT - 1 ||
      this.col <= 0 ||
      this.col >= MAP_WIDTH - 1
    );
  }

  /* Returns true if the character has a clear path
   * immediately in front of it (i.e. no walls).
   */
  hasAClearPath(grid) {
    let aWall = true;
    try {
      switch (this.heading) {
        case "up":
          aWall = containsWall(grid, this.row - 1, this.col);
          break;
        case "down":
          aWall = containsWall(grid, this.row + 1, this.col);
          break;
        case "left":
          aWall = containsWall(grid, this.row, this.col - 1);
          break;
        case "right":
          aWall = containsWall(grid, this.row, this.col + 1);
          break;
      }
    } catch (error) {
      console.error(error);
      return false;
    }

    // If we can see a wall coming, check if we're close enough to be stopped
    return aWall ? !this.isCloseEnough() : true;
  }

  /* Returns true if the sprite is within a threshold of the
   * middle of the character's row (or col, depending on heading)
   */
  isCloseEnough() {
    return (
      Math.abs(
        this.heading == "right" || this.heading == "left"
          ? this.xDiff
          : this.yDiff
      ) < THRESHOLD
    );
  }

  /* Returns true if the sprite is in contact with a given other sprite
   */
  isTouching(neighbor) {
    if (!neighbor || !neighbor.sprite.visible) return false;
    return (
      Math.abs(this.sprite.x - neighbor.sprite.x) < this.sprite.width / 2 &&
      Math.abs(this.sprite.y - neighbor.sprite.y) < this.sprite.height / 2
    );
  }

  /* Change the character's heading.
   * Called by gameplay button event listeners
   */
  turnSprite(direction) {
    let face = 0;
    switch (direction) {
      case "up":
        face = (3 * Math.PI) / 2;
        break;
      case "down":
        face = Math.PI / 2;
        break;
      case "left":
        face = Math.PI;
        break;
      case "right":
        break;
    }
    this.heading = direction;
    this.sprite.rotation = face;
  }

  /* Nudge the sprite back to
   * the center of its path
   */
  recenter() {
    let x = this.sprite.x;
    let y = this.sprite.y;
    switch (this.heading) {
      case "up":
        x += this.xDiff;
        this.xDiff = 0;
        break;
      case "down":
        x += this.xDiff;
        this.xDiff = 0;
        break;
      case "left":
        y += this.yDiff;
        this.yDiff = 0;
        break;
      case "right":
        y += this.yDiff;
        this.yDiff = 0;
        break;
    }
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /* Self-explanatory.
   */
  getDrunk() {
    this.drunk = true;
    this.sprite.texture = PIXI.Texture.from(TileImages.DRUNK_PAC_MAN);
  }

  /* Self-explanatory.
   */
  soberUp() {
    this.drunk = false;
    this.sprite.texture = PIXI.Texture.from(TileImages.PAC_MAN);
    this.cloudMultiplier = 1;
  }

  /* Back up at double speed. Ticker should call this if
   * the character finds itself sharing space with a wall.
   */
  backUp() {
    switch (this.heading) {
      case "up":
        this.sprite.y += this.speed * 2;
        break;
      case "down":
        this.sprite.y -= this.speed * 2;
        break;
      case "left":
        this.sprite.x += this.speed * 2;
        break;
      case "right":
        this.sprite.x -= this.speed * 2;
        break;
    }
  }
}
