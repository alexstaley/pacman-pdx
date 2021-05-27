// The following video was used to help with this portion:
// "9.3: Firebase: Retrieving Data - Programming with Text"
// https://www.youtube.com/watch?v=NcewaPfFR6Y

// Also referred to exercise 06-api.js from HW3 for appending to list

let database = firebase.database();

let ref = database.ref('leaderboard');
ref.on('value', getData, errData); 

function getData(data){
    let scores = data.val();
    let keys = Object.keys(scores);
    console.log(keys);

    // TODO: sort in descending order (highest score to lowest)

    let query = ref.orderByChild('highscore').limitToLast(3);
    query.on('value', function(snapshot){
        
    })

    let playerList = document.getElementById('leaderboard-player');
    let scoreList = document.getElementById('leaderboard-score');

    // TODO: change keys.length to 5 
    for (let i = 0; i < keys.length; i++){
        let k = keys[i];
        let name = scores[k].name;
        let score = scores[k].score;
        let highscore = scores[k].highscore
            .toLocaleString()

        let playerListItem = document.createElement('li');
        playerListItem.textContent = `${name}`;
        playerList.appendChild(playerListItem);

        let scoreListItem = document.createElement('dt');
        scoreListItem.textContent = `${highscore}`;
        scoreList.appendChild(scoreListItem);
    }
}

// If error in retrieving data
function errData(err){
    console.log('Error!');
    console.log(err);
}