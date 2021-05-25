// The following video was used to help with this portion:
// "9.3: Firebase: Retrieving Data - Programming with Text"
// https://www.youtube.com/watch?v=NcewaPfFR6Y

let database = firebase.database();

let ref = database.ref('leaderboard');
ref.on('value', gotData, errData);

function gotData(data){
    // console.log(data.val());

    let scores = data.val();
    let keys = Object.keys(scores);
    console.log(keys);

    for (let i = 0; i < keys.length; i++){
        let k = keys[i];
        let name = scores[k].name;
        let score = scores[k].score;
        let highscore = scores[k].highscore;
        console.log(name, score, highscore);
    }
}

function errData(err){
    console.log('Error!');
    console.log(err);
}

// const score = document.querySelector("#userscore");
// const leaderBoard = document.querySelector("#leaderBoard");


// const username = document.getElementById('username');
// const highscore = document.getElementById('highscore');

// const database = firebase.database();