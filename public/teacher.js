
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
  console.log(e);
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

// Update word 
function updateWord (word, forceUpdate=false) {
  
  // update the hint container 
  gpcs = wordList[word];
  phonemes = gpcs.map(x => x.split("~")[1]);
  graphemes = gpcs.map(x => x.split("~")[0]); 
  console.log("phonemes: ", phonemes);

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
  console.log(gpcs);
  window.gpcs = gpcs;
  pushMessage("word", {gpcs: gpcs, forceUpdate: forceUpdate});
}

// Send a hint
function sendHint(position) { 
  pushMessage("hint", position);
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Grade answer 
function gradeAnswer(correct) {
  if(correct) {
    pushMessage('correct');
    pickWord(1)
  } else {
    pushMessage('incorrect');
    pickWord(0)
  }
}


// Pick new word and send to student 
function pickWord(correct) {

  // set percentile if not set 
  if (typeof percentile === 'undefined') {
    percentile = 5; 
  }


  // start a streak counter if one not set 
  if (typeof streak === 'undefined') {
    streak = 0; 
  }

  // if correct, increment the streak. otherwise, reset streak and jump down a percentile level
  if (correct) {
    streak++; 
  } else {
    streak = 0;
    percentile -= 5;
  }

  // tell them when they've won  
  if (percentile == 100 && streak >=6) {
    alert("You beat the game!");  
  }

  // if streak over 5, increment percentile by 5 and reset streak 
  if(streak >=6) {
    percentile += 5;
    streak = 0;
  }

  // make sure percentile is positive 
  if (percentile < 5) {
    percentile = 5; 
  }

  // make sure percentile is not over 100 
  if (percentile > 100) {
    percentile = 100; 
  }

  // Get max and min index in wordList based on percentile 
  num_words = Object.keys(wordList).length
  max_index = Math.floor( num_words * (percentile/100) ) - 1
  min_index = Math.floor( num_words * (percentile - 5) / 100 ) 

  // pick randomly from within that index 
  // next_word_index = randomIntFromInterval(min_index, max_index)
  next_word_index = min_index + 1; 

  word = Object.keys(wordList)[next_word_index];
  
  console.log("Percentile: ", percentile); 
  console.log("Streak: ", streak); 
  console.log("Index:", next_word_index);
  console.log("word: ", word);

  // set that word as the current word 
  updateWord( word )
}


function setup() {

  words = Object.keys(wordList); 


  words.forEach(function(word) {
    el = $("<li>" + word + "</li>" );
    $("#wordList").append( el );
  });


  $( "#wordList li" ).click(function() {
    word = $(this).text(); 
    console.log(word);
    updateWord(word, true);
  });

  
}


$(document).ready(function() {
  setup();
});
