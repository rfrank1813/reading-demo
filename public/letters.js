// TODO 
// I probably need to record nicer versions of the words
// And maybe need to redo some phonemes 
// Make sure the word gets read out loud when a new one comes in 
// How to help when kid gets stuck? 
// Like maybe after 2-3 tries, you bounce the correct first letter and play sound 
// How to get a sense of when this game is complete? 

function playSound(url) {
  var sound = new Howl({
    src: [url]
  });
  sound.play();
}

function startGame() {
  console.log("Start game called"); 
  $(".initial-cover").remove();

  updateWord()
}

// Read the word aloud 
function readWord() {
  path_to_file = "//primer-words.s3-us-west-2.amazonaws.com/"+window.word+".mp3";
  playSound(path_to_file);
}


// Show reward 
function showReward() {
  $(".gameplay-container").hide() 

  $(".reward-cover").show()

  playSound("/fanfare.m4a")

  setTimeout( function() {
    $(".reward-cover").hide()
    $(".gameplay-container").show()

  }, 1000)
}


const curriculum = [
  "cat", 
  "bat", 
  "fat",
  "rat", 
  "mat", 
  "sat",
  "sam",
  "ram", 
  "bam",
  "dam",
  "met",
  "bet",
  "set"
]

// Just puts the word in html. Another function displays it. 
function updateWord() {

  // clear existing word
  $(".target").html("")
  $(".options").html("")


  // Init word_index
  if ( typeof(word_index) == "undefined" ) {
    word_index = -1
  }

  // Increment the word index
  word_index += 1 

  // Get the new word
  new_word = curriculum[word_index]

  // Get the new word's GPCS 
  gpcs = wordList[new_word]

  console.log("GPCS: ", gpcs)  

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

  draggableOptions = {
    revert: function (event, ui) {
      console.log("REVERT")


      // Stop saying the phoneme
      clearInterval(window.phonemeInterval)

      // Target position
      targetPosition = $(event).attr('position')

      // Option position 
      optionPosition = this.attr("position")

      // Check for match 
      if( optionPosition == targetPosition ) {
        playSound("/positive.mp3")
        this.draggable("disable")

        // Slide element into place 
        $(this).remove()
        $(event).append(this)
        $(this).css({top: "-0.2em", left: 0})

        // If the word is complete, get a new word 
        if ( $('.target').children().length == 3 ) {
          showReward()

          setTimeout(updateWord, 2500);
        }

        return false 
      } else {
        playSound("/wrong.mp3")

        // Read the word 
        setTimeout(readWord, 500); 

        // Think about reading out each phoneme in turn here 

        return true 
      }
    },
    start: function (event, ui) {

      // Get the phoneme 
      phoneme = event.srcElement.getAttribute("phoneme")

      // Play the phoneme sound once to avoid delay on first play coming from setInterval
      playSound(`/phonemes/${phoneme}.mp3`)

      // Play the phoneme while being dragged 
      window.phonemeInterval = setInterval( function() {
        playSound(`/phonemes/${phoneme}.mp3`)
      }, 500);
    },
    stop: function (event, ui) {
      console.log("Drag stop!")
      clearInterval(window.phonemeInterval)
    }
  }

  // Make each option drag/droppable 
  $(".option").draggable( draggableOptions )

  droppableOptions = {
    hoverClass: "drop-target-active",
    accept: ".option"
  }

  $(".target").droppable( droppableOptions )


  // Play the entire word 
  window.word = new_word 
  readWord()
  


  // HOW TO DO THE DRAG / DROP THING 

  // DONE -- And you need to properly tag the targets and options 

  // D0NE - When being dragged, repeat the phoneme sound 

  // DONE -- When hovering over the target, highlight the target 

  // DONE - If dropped on wrong target, make a sound and return to it's space

  // DONE - If dropped on the right target, make a positive sound and snap to place 

  // DONE -- If dropped on not a target, Just return to original place 

  // If the word is now complete,
  // trigger smiley
  // And get a new word 

  

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
  // Nothing here
});