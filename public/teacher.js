// Some global variables -- Imported from files of the same name. 
var dictionary = dictionary; // The lookup table for words and their GPCs
var curriculum = readingCurriculum; // The ordered array of words and letters that make up the curriculum 


// Some setup variables 
var set_index = 0; 
var currentSet = curriculum[set_index];
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
  gpcs = dictionary[word];

  // If word not in dictionary, do an alert
  if (typeof(gpcs) == "undefined") {
    alert(`${word} is not in the dictionary.`); 
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
    set_index++;
    currentSet = curriculum[set_index];
  }
}



// Pick new word
function pickWord() {

  // If currentSet is empty, refill the set. 
  // This prevents recycling the same word over and over 
  if (currentSet.length == 0) {
    currentSet = curriculum[set_index];
  }


  // Pick a random word from the set 
  var word = currentSet[Math.floor(Math.random()*currentSet.length)];


  // Remove that word from the set so we don't keep giving the same word
  currentSet = currentSet.filter(e => e !== word);


  sendWordToStudent( word );
}





//DEPRECATED FOR NOW 
function setup() {

  // Write the list of words to the page
  // curriculum.forEach(function(word) {
  //   el = $("<li>" + word + "</li>" );
  //   $("#wordList").append( el );
  // });


  // // Add click handlers to the words 
  // $( "#wordList li" ).click(function() {
  //   var word = $(this).text(); 
  //   updateWord(word, true);
  // });

  
}







