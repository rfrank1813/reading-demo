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

  // clear existing word
  $(".target").html("")
  $(".options").html("")
  
  msg = new_word; 

  // Parse string to array 
  gpcs = msg

  

  // Put each gpc of the word into a span 
  options = [];
  gpcs.forEach( function(gpc, i) {
    gpc = gpc.split("~")
    gr = gpc[0]
    ph = gpc[1]

    html = `<div class='option' position="${i}" phoneme="${ph}">${gr}</div>`
    options.push(html)
  })

  // Randomize the options  
  for (var i = options.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = options[i];
    options[i] = options[j];
    options[j] = temp;
  }

  // Display the options
  options.forEach( function(option, i) {
    $(".options").append(option);

    // This probably won't work. Need to animate these letters
    animateCSS('.option', 'zoomIn');
  });


  // Make each option drag/droppable 
  $(".option").draggable({
    revert: "invalid"
  })


  $(".target").droppable({
    accept: ".option"
  })

  // HOW TO DO THE DRAG / DROP THING 
  // RULES 

  // You need to handle the event during drag 

  // And you need to properly tag the targets and options 

  // When being dragged, repeat the phoneme sound 

  // When hovering over the target, highlight the target 

  // If dropped on wrong target, 
  // make a sound
  // and return to it's space 

  // If dropped on the right target, 
  // make a positive sound 
  // and snap to place 

  // If dropped on not a target,
  // Just return to original place 

  // If the word is now complete,
  // trigger smiley
  // And get a new word 

  

}

function updateStreakTracker(direction) {

  // Clear the word 
  $(".target").html("")

  if(direction == 1) {
    // Add a smiley 
    $('.streak-tracker').append("<img class='tracker-smiley' src='/happy.png'/>")

    animateCSS("img:last-child", "tada", function() {
    
      // If 5 smileys, clear the tracker 
      smileys = $(".streak-tracker").children().length
      if(smileys >= 5) {
        updateProgressBar(1)
      } else {
        updateWord()
      }
    })
  }

  if(direction == -1) {

    // Add a sad face 
    $('.streak-tracker').append("<img src='/dead.png'/>")

    // Wait a tick
    setTimeout(function() {

      // Clear the streak tracker
      animateCSS(".streak-tracker", "shake", function() {
        $(".streak-tracker").children().remove()

        // Update progress bar 
        updateProgressBar(-1)
      });
    }, 1000);
  }
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
  firstWord = true

  window.new_word = ['c~k', 'a~ae', 't~t'];
  updateWord()
});