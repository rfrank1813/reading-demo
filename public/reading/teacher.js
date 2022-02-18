// Some global variables -- Imported from files of the same name. 
var dictionary = dictionary; // The lookup table for words and their GPCs
var levelsList = readingCurriculum; // The ordered array of words and letters that make up the curriculum 
window.levelsList = levelsList;



// This next block is getting the level from urlParam
// And then setting the appropriate level
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var levelParam = getParameterByName('level');
window.levelParem = levelParam; 
console.log("level name: ", levelParam); 

var level = 0; 

if (levelParam != null) {
  level = levelParam;
}

console.log("Level: ", level); 

var curriculum = levelsList[level].content; 




// Some setup variables 
var superset_mode = 0; 
var set_index = 0; 
if (superset_mode) {
  currentSet = curriculum;
} else {
  currentSet = curriculum[set_index];
}
var score = 0; 


// All my websocket stuff 
var connection = new WebSocket('ws://'+location.hostname+':82'); 

connection.onopen = function (e) { 
  console.log("connected "+e); 
}; 

connection.onerror = function (error) { 
  console.log('WebSocket Error ' + error); 
}; 

// Does nothing for now. 
connection.onmessage = function (e) { 
  // console.log(e);
  // let obj=JSON.parse(e.data); 
  // console.log(obj);
};

// Sends message to the student app 
// message must be a string 
function pushMessage(action, data={}) {
  msg = {}
  msg.action = action 
  msg.data = data
  str = JSON.stringify(msg)
  connection.send(str); 
};


function sendWordToStudent (word, forceUpdate=false) {
  
  // Lookup word in dictionary to get the GPCs
  var gpcs = dictionary[word];

  // If word not in dictionary, just faked the GPCS
  if (typeof(gpcs) == "undefined") {

    gpcs = [];

    word.split('').forEach(function(letter) {
      gpc = letter + "~" + letter;
      gpcs.push(gpc); 
    });

  }

  phonemes = gpcs.map(x => x.split("~")[1]);
  graphemes = gpcs.map(x => x.split("~")[0]); 

  html = "";
  phonemes.forEach( function(ph,i) {
    if(i != 0) {
      html = html + "<span>&bull;</span>";
    }
    html = html + `<span onclick='sendHint(${i})'>${graphemes[i]}</span>`
  })
  $(".hint-container").html(html);

  $("#hint-message").show()


  // send the word via pushMessage
  window.gpcs = gpcs;
  pushMessage("word", {gpcs: gpcs, forceUpdate: forceUpdate});
}

// Send a hint
function sendHint(position) { 
  pushMessage("hint", position);
}



// Grade answer 
// This is triggered by user tap/click in teacehr UI 
// Passes 1 if correct, 0 if not 
function gradeAnswer(correct) {
  if(correct) {
    pushMessage('correct');
  } else {
    pushMessage('incorrect');
  }
  updateScore(correct); 
  pickWord(); 
}



// Update user's score 
// Update set if needed 
function updateScore(increment) {
  score = score + increment; 

  if (score % 7 == 0 && increment > 0) {
    if(superset_mode) { return; }
    set_index++;
    currentSet = curriculum[set_index];
  }
}



// Pick new word
function pickWord() {

  // If currentSet is empty, refill the set. 
  // This prevents recycling the same word over and over 
  if (currentSet.length == 0) {
    if(superset_mode) { return; }
    currentSet = curriculum[set_index];
  }


  // Pick a random word from the set 
  var word = currentSet[Math.floor(Math.random()*currentSet.length)];


  // Remove that word from the set so we don't keep giving the same word
  currentSet = currentSet.filter(e => e !== word);


  sendWordToStudent( word );
}


document.addEventListener("DOMContentLoaded", function(event) {
  levelsList.forEach(function(level, index) {
    console.log(level.description);

    $("#curriculumLevels").append(`<li> <a href='/reading/teacher?level=${index}'>${level.description}</a></li>`)

  });
});









