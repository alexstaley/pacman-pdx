// The following video was used to help with this portion:
// "9.3: Firebase: Retrieving Data - Programming with Text"
// https://www.youtube.com/watch?v=NcewaPfFR6Y

let database = firebase.database();

let ref = database.ref('leaderboard');
ref.on('value', getData, errData);

function getData(data){
    let scores = data.val();
    let keys = Object.keys(scores);
    console.log(keys);

    let list = document.getElementById('leaderboard');

    for (let i = 0; i < keys.length; i++){
        let k = keys[i];
        let name = scores[k].name;
        let score = scores[k].score;
        let highscore = scores[k].highscore;

        // let li = document.createElement('li', name + " ------- " + highscore);
        // li.parent('leaderboard');
        let listitem = document.createElement('li');
        listitem.textContent = `${name} - ${highscore}`;
        list.appendChild(listitem);
        console.log(name, highscore);
    }
}

// If error retrieving data
function errData(err){
    console.log('Error!');
    console.log(err);
}