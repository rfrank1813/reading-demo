// Some global variables -- Imported from files of the same name. 
dictionary = dictionary // The lookup table for words and their GPCs
curriculum = curriculum // The ordered array of words and letters that make up the curriculum 



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

// Send the next word to the student 
function updateWord (word, forceUpdate=false) {
  
  // update the hint container 
  gpcs = dictionary[word];

  // If word not in dictionary, do an alert
  if (typeof(gpcs) == "undefined") {
    alert("${word} is not in the dictionary."); 
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
function gradeAnswer(correct) {
  if(correct) {
    pushMessage('correct');
  } else {
    pushMessage('incorrect');
  }
  pickWord(); 
}


// Pick new word and send to student 
function pickWord() {

  // Advance through the list 
  word_index = word_index + 1; 

  // Get the word by its position in the curriculum
  word_from_dictionary = curriculum[word_index]; 


  // set that word as the current word 
  updateWord( word_from_dictionary )
}


function setup() {

  // Start at the first word in the list 
  word_index = 0; 


  // Write the list of words to the page
  curriculum.forEach(function(word) {
    el = $("<li>" + word + "</li>" );
    $("#wordList").append( el );
  });


  // Add click handlers to the words 
  $( "#wordList li" ).click(function() {
    var word = $(this).text(); 
    updateWord(word, true);
  });

  
}


$(document).ready(function() {
  setup();
});
