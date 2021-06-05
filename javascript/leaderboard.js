// The following video was used to help with this portion:
// "9.3: Firebase: Retrieving Data - Programming with Text"
// https://www.youtube.com/watch?v=NcewaPfFR6Y

// Also referred to exercise 06-api.js from HW3 for appending to list

let database = firebase.database();

let ref = database.ref("leaderboard");
ref.on("value", getData, errData);

function getData(data) {
  let scores = data.val();

  let scoresArray = [];
  for (let player in scores) {
    scoresArray.push(scores[player]);
  }
  console.log(scoresArray);
  let hiScores = scoresArray.sort((player1, player2) => {
    return player2.highscore - player1.highscore;
  });
  console.log(hiScores);

  let playerList = document.getElementById("leaderboard-player");
  let scoreList = document.getElementById("leaderboard-score");
  let length = Math.min(hiScores.length, 5);

  for (let i = 0; i < length; i++) {
    let name = hiScores[i].name;
    console.log(name);
    let highscore = hiScores[i].highscore.toLocaleString();

    let playerListItem = document.createElement("li");
    playerListItem.textContent = `${name}`;
    playerList.appendChild(playerListItem);

    let scoreListItem = document.createElement("dt");
    scoreListItem.textContent = `${highscore}`;
    scoreList.appendChild(scoreListItem);
  }
}

// If error in retrieving data
function errData(err) {
  console.log("Error!");
  console.log(err);
}
