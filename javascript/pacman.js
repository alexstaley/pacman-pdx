import { MAP_WIDTH, MAP_HEIGHT, map1, map2 } from "./modules/maps.js";

let world = document.getElementById("world");

function drawWorld(initMap) {
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case 10:
          world.innerHTML += "<div class='tile ground'></div>";
          break;
        case 11:
          world.innerHTML += "<div class='tile log'></div>";
          break;
        case 12:
          world.innerHTML += "<div class='tile log log-vert'></div>";
          break;
        case 13:
          world.innerHTML += "<div class='tile thorns thorns-tl'></div>";
          break;
        case 14:
          world.innerHTML += "<div class='tile thorns'></div>";
          break;
        case 15:
          world.innerHTML += "<div class='tile thorns thorns-bl'></div>";
          break;
        case 16:
          world.innerHTML += "<div class='tile thorns thorns-br'></div>";
          break;
        case 20:
          world.innerHTML += "<div class='tile pacman-right'></div>";
          break;
        case 21:
          world.innerHTML += "<div class='tile pacman-down'></div>";
          break;
        case 22:
          world.innerHTML += "<div class='tile pacman-left'></div>";
          break;
        case 23:
          world.innerHTML += "<div class='tile pacman-up'></div>";
          break;
        case 30:
          world.innerHTML += "<div class='tile rose-coin'></div>";
          break;
        case 31:
          world.innerHTML += "<div class='tile rose-red'></div>";
          break;
        case 32:
          world.innerHTML += "<div class='tile rose-yellow'></div>";
          break;
        case 33:
          world.innerHTML += "<div class='tile rose-pink'></div>";
          break;
        case 34:
          world.innerHTML += "<div class='tile rose-gold'></div>";
          break;
        case 35:
          world.innerHTML += "<div class='tile rose-brown'></div>";
          break;
        case 36:
          world.innerHTML += "<div class='tile rose-white'></div>";
          break;
        case 37:
          world.innerHTML += "<div class='tile beer'></div>";
      }
    }
    world.innerHTML += "<br>";
  }
}

drawWorld(map1);
