import {
  MAP_WIDTH,
  MAP_HEIGHT,
  THRESHOLD,
  TileImages,
  containsWall,
} from "./maps.js";

/* A Character is a wrapper for a PIXI.Sprite object.
 * In addition to the sprite, it knows about the grid.
 */
export class Character {
  constructor(img, canvas, row, col) {
    const texture = PIXI.Texture.from(img);
    this.sprite = new PIXI.Sprite(texture);
    this.img = img;
    this.name = img.slice(10, -4); // slices {name} from '../Images/{name}.png'
    this.row = row;
    this.col = col;
    this.xDiff = 0.0; // Difference between sprite's x-coord and the center of its column
    this.yDiff = 0.0; // Difference between sprite's y-coord and the center of its row
    this.heading = "down";
    this.speed = 2;
    this.replaceSprite(canvas);
    this.resizeSprite();
  }

  /* Reset the position of the sprite.
   * Used when initializing a sprite and resizing the screen.
   */
  replaceSprite(canvas) {
    this.sprite.x = canvas.width * (1 - (MAP_WIDTH - this.col) / MAP_WIDTH);
    this.sprite.y = canvas.height * (1 - (MAP_HEIGHT - this.row) / MAP_HEIGHT);
    this.xDiff = this.yDiff = 0.0;

    // Adjust anchor point of coins
    if (this.img == TileImages.COIN) {
      this.sprite.anchor.x = -2;
      this.sprite.anchor.y = -1;
    }
  }

  /* Reset the size of the sprite.
   * Used when initializing a sprite and resizing the screen.
   */
  resizeSprite() {
    // Resize sprite
    this.sprite.width = 0.04 * window.innerWidth;
    this.sprite.height = 0.04 * window.innerWidth;

    // Shrink coins
    if (this.img == TileImages.COIN) {
      this.sprite.height *= 0.25;
      this.sprite.width *= 0.25;
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
  }

  /* Change the character's heading.
   * Called by gameplay button event listeners //TODO
   */
  turnSprite(direction) {
    this.heading = direction;
  }

  /* Returns true if the sprite is within a threshold of the
   * middle of the character's row (or col, depending on heading)
   */
  closeEnough() {
    return (
      Math.abs(
        this.heading == "right" || this.heading == "left"
          ? this.xDiff
          : this.yDiff
      ) < THRESHOLD
    );
  }

  /* Returns true if the character has a clear path in front of it
   */
  clearPath(grid) {
    let aWall = true;
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

    // If we can see a wall coming, check if we're close enough to be stopped
    return aWall ? !this.closeEnough() : true;
  }

  /* If there is a clear path, move forward at speed
   */
  moveOn(grid) {
    if (this.clearPath(grid)) {
      switch (this.heading) {
        case "up":
          this.sprite.y -= this.speed;
        case "down":
          this.sprite.y += this.speed;
        case "left":
          this.sprite.x -= this.speed;
        case "right":
          this.sprite.x += this.speed;
      }
    }
  }

  /* Back up at double speed. Ticker should call this if
   * the character finds itself sharing space with a wall.
   */
  backUp() {
    switch (this.heading) {
      case "up":
        this.sprite.y += this.speed * 2;
      case "down":
        this.sprite.y -= this.speed * 2;
      case "left":
        this.sprite.x += this.speed * 2;
      case "right":
        this.sprite.x -= this.speed * 2;
    }
  }
}
