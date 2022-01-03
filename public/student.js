// HANDLE WEBSOCKETS 

var connection = new WebSocket('ws://'+location.hostname+':82'); 

connection.onopen = function (e) { 
  console.log("connected "+e); 
}; 

connection.onerror = function (error) { 
  console.log('WebSocket Error ' + error); 
}; 

connection.onmessage = function (e) { 

  window.e = e 
  let msg= JSON.parse(e.data); 
  console.log("MSG: ", msg);
  window.msg = msg;

  // Handle everything else 
  switch(msg.action) {
    case 'hint': 
      position = msg.data;
      doHint(position);
      break; 
    case 'correct':
      playSound("/positive.mp3")
      updateStreakTracker(1);
      break;
    case 'incorrect':
      playSound("/wrong.mp3")
      updateStreakTracker(-1)
      break;
    case 'word':

      // updateWord function pulls from here
      window.new_word = msg.data.gpcs

      // on first word, show to user
      // all other times, wait for updateWord to be called from elsewhere 
      if( firstWord || msg.data.forceUpdate ) {
        firstWord = false
        updateWord() 
      } else {
        // do nothing
      }
  }
} 


function playSound(url) {
  var sound = new Howl({
    src: [url]
  });
  sound.play();
}

// Just puts the word in html. Another function displays it. 
function updateWord() {
  
  msg = new_word; 

  // Parse string to array 
  gpcs = msg

  // How to handle o-e and such
  // Well it's basically a trailing e always 
  // So what you do is if you see that, you just split it 
  // Put the first letter in right away
  // Save the second letter and the position for later 
  // Once you're done looping through, just look for a trailing e and pop it on if needed 
  // Actually, it's not that
  // You just want to put in a single consonant

  // check for compound grapheme, like "o-e" in the word "tone"
  compound_grapheme = false 

  // Put each gpc of the word into a span 
  html = "";
  gpcs.forEach( function(gpc, i) {
    gpc = gpc.split("~")
    gr = gpc[0]
    ph = gpc[1]

    // check for trailing e
    if( gr.includes("-") ) {
      compound_grapheme = true 
      gr = gr.split("-")[0]
      compound_grapheme_class = `position${i}`
    }

    // check for the pattern 'o-e' followed by 'le' grapheme, as in 'mole'
    // make sure it doesn't display as 'molee'
    if( compound_grapheme && gr == "le") {
      gr = "l"
    }

    html = html + `<div style='display:inline-block' class="position${i}" phoneme="${ph}">${gr}</div>`

  })

  if( compound_grapheme ) {
    html = html + `<div style='display:inline-block' class="${compound_grapheme_class}" >e</div>`
  }

  $("#word").html(html);

  animateCSS('#word', 'zoomIn');

}


// What happens?

// When the FIRST new word comes in, just call the updateWord function 

// For all subsequent words, just set a window variable 

// Get rid of the "pause" variable 

// When an answer is given, do all your animation. At end of animation, call updateWord 



function updateStreakTracker(direction) {

  // Update score counter 
  num_correct = num_correct + direction; 
  $("#score-counter").html(num_correct);



  // Clear the word 
  $("#word").html("")


  // Put in a new word
  updateWord(); 

}


function updateProgressBar(direction) {

  // play a sound
  if(direction > 0) {
    playSound("/fanfare.m4a")
  } else {
    // do nothing
  }
  

  // Hide the word
  $("#word").html()

  // get screen width 
  screen_width = $(".progress-tracker").width() 

  // use screen width to determine pixel width of increment 
  section_width = Math.floor( screen_width / 20 ); 

  // multiply by direction, either 1 or -1 
  increment = section_width * direction 

  // get current progress bar width 
  current_width = $(".progress-tracker-inner").width() 

  // add result to progress bar width
  new_width = increment + current_width

  // set width to 0 if calculated width is less than 0
  if (new_width < 0) {
    new_width = 0;
  }

  // Empty streak tracker
  setTimeout(function(){
    $(".streak-tracker").children().remove()

    // update progress bar width
    animateCSS(".progress-tracker", "pulse", function() {
      $(".progress-tracker-inner").width(new_width);
      setTimeout(updateWord, 500)
    })
  }, 1000)

  
  
} 

function doHint(position) {
  selector = `.position${position}`

  phoneme = $(selector).first().attr("phoneme")

  // Play the sound
  var sound = new Howl({
    src: ["/phonemes/"+phoneme+".mp3"]
  });
  sound.play();

  // Pulse the letters
  animateCSS(selector, 'bounce');
}

function ready() {
  $(".go-button").hide()
  $("#word").html("wait...");

  // Start the countdown timer 
  timer = 60; 
  countdownTimer = setInterval(updateCountdown, 1000);
}


function updateCountdown() {
  timer = timer - 1; 

  if(timer == 0) {
    clearInterval(countdownTimer);
    alert(`Game over. You got: ${num_correct} `); 
  }
  $("#timer").html(String(timer)); 
}


// displayButtons function
function setup() {

  num_correct = 0;



  // fetch the right data for the buttons
  // add a db entry for id 0 on start state
  // $.ajax({
  //   url: "/get_word",
  //   type: "GET",
  //   success: function(data) {

  //     window.data = data;

  //     if(data.length==0) {
  //       alert("No data!"); 
  //     } 

  //     $("#word").html(data.word);
  //   }
  // });

}


function animateCSS(selector, animationName, callback) {
  
  nodes = $(selector)

  $.each(nodes, function( index, node) {

    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }); 
  
}

$(document).ready(function() {
  setup();
  firstWord = true
});