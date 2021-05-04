import { MAP_WIDTH, MAP_HEIGHT, map1 } from "./modules/maps.js";

let world = document.getElementById("world");

function drawWorld(initMap) {
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      if (initMap[r][c] === 1) {
        world.innerHTML += "<div class='wall'></div>";
      } else if (initMap[r][c] === 2) {
        world.innerHTML += "<div class='rose rose-red'></div>";
      } else if (initMap[r][c] === 3) {
        world.innerHTML += "<div class='ground'></div>";
      } else if (initMap[r][c] === 4) {
        world.innerHTML += "<div class='pacman pacman-right'></div>";
      } else if (initMap[r][c] === 5) {
        world.innerHTML += "<div class='beer'></div>";
      }
    }
    world.innerHTML += "<br>";
  }
}
//drawWorld();

drawWorld(map1);
