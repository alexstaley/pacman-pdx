import {
  MAP_WIDTH,
  MAP_HEIGHT,
  THRESHOLD,
  TILE_WIDTH,
  TileImages,
  containsWall,
} from "./maps.js";

// TODO: Try to refactor out the code from the Character class
// that only pertains to Pac-Man into a 'Pacman' subclass
// that uses a pixi Graphics object to animate Pac-Man's mouth
export class Pacman extends Character {
  constructor(img, canvas, windowWidth, row, col) {
    super(img, canvas, windowWidth, row, col);

    // this.sprite = new PIXI.Sprite();
    // let graphic = new PIXI.Graphics();
    // this.sprite.addChild(graphic);
    // this.drawPacman(Math.PI / 6);
    this.graphic = new PIXI.Graphics();
    this.sprite.addChild(this.graphic);
    this.drunk = false;
    this.replacePacman();
    this.resizePacman();
  }

  /* Do math to define Pac-Man's
   * mouth based on the heading
   */
  defineMouth(angle, radius) {
    let mouthCoords = [0, 0, 0, 0, 0, 0];
    let x = this.sprite.getChildAt(0).x;
    let y = this.sprite.getChildAt(0).y;
    switch (this.heading) {
      case "up":
        mouthCoords[0] = x + Math.cos(angle + (Math.PI * 3) / 2) * radius;
        mouthCoords[1] = y + Math.sin(angle + (Math.PI * 3) / 2) * radius;
        mouthCoords[2] = x - Math.cos(angle + (Math.PI * 3) / 2) * radius;
        mouthCoords[3] = mouthCoords[1];
        mouthCoords[4] = (Math.PI * 3) / 2 + angle;
        mouthCoords[5] = (Math.PI * 3) / 2 - angle;
        break;
      case "down":
        mouthCoords[0] = x + Math.cos(angle + (Math.PI * 3) / 2) * radius;
        mouthCoords[1] = y - Math.sin(angle + (Math.PI * 3) / 2) * radius;
        mouthCoords[2] = x - Math.cos(angle + (Math.PI * 3) / 2) * radius;
        mouthCoords[3] = mouthCoords[1];
        mouthCoords[4] = Math.PI / 2 + angle;
        mouthCoords[5] = Math.PI / 2 - angle;
        break;
      case "left":
        mouthCoords[0] = x + Math.cos(angle + Math.PI) * radius;
        mouthCoords[1] = y + Math.sin(angle + Math.PI) * radius;
        mouthCoords[2] = mouthCoords[0];
        mouthCoords[3] = y - Math.sin(angle + Math.PI) * radius;
        mouthCoords[4] = Math.PI + angle;
        mouthCoords[5] = Math.PI - angle;
        break;
      case "right":
        mouthCoords[0] = x + Math.cos(angle) * radius;
        mouthCoords[1] = y - Math.sin(angle) * radius;
        mouthCoords[2] = x + Math.cos(angle) * radius;
        mouthCoords[3] = y + Math.sin(angle) * radius;
        mouthCoords[4] = angle;
        mouthCoords[5] = Math.PI * 2 - angle;
        break;
    }
    return mouthCoords;
  }

  drawPacman(angle) {
    let radius = 0.02 * window.innerWidth;
    let mouthCoords = this.defineMouth(angle, radius);
    let graphic = this.sprite.getChildAt(0);
    graphic.lineStyle(1, 0x000000);

    // Draw body
    graphic.beginFill(0xf7fd04);
    graphic.drawCircle(graphic.x, graphic.y, radius);
    graphic.endFill();

    graphic.beginFill(0x000000);

    // Draw mouth front
    graphic.arc(
      graphic.x,
      graphic.y,
      radius,
      mouthCoords[4],
      mouthCoords[5],
      true
    );

    // Draw mouth back
    graphic.drawPolygon([
      graphic.x,
      graphic.y,
      mouthCoords[0],
      mouthCoords[1],
      mouthCoords[2],
      mouthCoords[3],
    ]);
    graphic.endFill();
  }

  animateMouth(delta) {
    let angle = (Math.PI / 8) * (1 + Math.sin(delta * 2));
    // this.sprite.clear();
    this.drawPacman(angle);
  }
}
