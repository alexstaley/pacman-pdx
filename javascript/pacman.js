import { MAP_WIDTH, MAP_HEIGHT, map1, map2 } from "./modules/maps.js";

let world = document.getElementById("world");

function drawWorld(initMap) {
  for (let r = 0; r < MAP_WIDTH; ++r) /*rows*/ {
    for (let c = 0; c < MAP_HEIGHT; ++c) /*cols*/ {
      switch (initMap[r][c]) {
        case 10:
          world.innerHTML += "<div class='ground'></div>";
          break;
        case 11:
          world.innerHTML += "<div class='wall log-horiz'></div>";
          break;
        case 12:
          world.innerHTML += "<div class='wall log-vert'></div>";
          break;
        case 13:
          world.innerHTML += "<div class='wall thorns-tl'></div>";
          break;
        case 14:
          world.innerHTML += "<div class='wall thorns-tr'></div>";
          break;
        case 15:
          world.innerHTML += "<div class='wall thorns-bl'></div>";
          break;
        case 16:
          world.innerHTML += "<div class='wall thorns-br'></div>";
          break;
        case 20:
          world.innerHTML += "<div class='pacman pacman-right'></div>";
          break;
        case 21:
          world.innerHTML += "<div class='pacman pacman-down'></div>";
          break;
        case 22:
          world.innerHTML += "<div class='pacman pacman-left'></div>";
          break;
        case 23:
          world.innerHTML += "<div class='pacman pacman-up'></div>";
          break;
        case 30:
          world.innerHTML += "<div class='rose rose-coin'></div>";
          break;
        case 31:
          world.innerHTML += "<div class='rose rose-red'></div>";
          break;
        case 32:
          world.innerHTML += "<div class='rose rose-yellow'></div>";
          break;
        case 33:
          world.innerHTML += "<div class='rose rose-pink'></div>";
          break;
        case 34:
          world.innerHTML += "<div class='rose rose-gol'></div>";
          break;
        case 35:
          world.innerHTML += "<div class='rose rose-brown'></div>";
          break;
        case 36:
          world.innerHTML += "<div class='rose rose-white'></div>";
          break;
        case 37:
          world.innerHTML += "<div class='beer'></div>";
      }
    }
    world.innerHTML += "<br>";
  }
}

drawWorld(map1);
