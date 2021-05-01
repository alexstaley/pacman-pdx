import { MAP_WIDTH, MAP_HEIGHT, map1 } from "./modules/maps.js";

function drawWorld(initMap) {
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      if (initMap[r][c] === 1) {
        document.getElementById("world").innerHTML +=
          "<div class='wall'></div>";
      } else if (initMap[r][c] === 2) {
        document.getElementById("world").innerHTML +=
          "<div class='rose-red'></div>";
      } else if (initMap[r][c] === 3) {
        document.getElementById("world").innerHTML +=
          "<div class='ground'></div>";
      } else if (initMap[r][c] === 4) {
        document.getElementById("world").innerHTML +=
          "<div class='pacman-right'></div>";
      }
    }
    document.getElementById("world").innerHTML += "<br>";
  }
}

drawWorld(map1);
