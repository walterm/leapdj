var recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) { 
  console.log(event) 
}
recognition.start();

// // GAME SETUP
// var initialState = SKIPSETUP ? "playing" : "setup";
// var gameState = new GameState({state: initialState});
// var cpuBoard = new Board({autoDeploy: true, name: "cpu"});
// var playerBoard = new Board({autoDeploy: SKIPSETUP, name: "player"});
// var cursor = new Cursor();

// // UI SETUP
setupUserInterface();


// // isGrabbing: Is the player's hand currently in a grabbing pose
// var isGrabbing = false;
// var sound = new Howl({
//         buffer: true,
//         urls: ['./sounds/queen.mp3'],
//         onloaderror: function () {
//           console.log("error");
//         }
//       });
// //probably move into main loop
// var volume = sound.volume();
// var pos = sound.pos();
// console.log(volume);
// console.log(pos);

var processSpeech = function(transcript) {
  console.log("here1");
  // Helper function to detect if any commands appear in a string
  var userSaid = function(str, commands) {
    console.log("TARGET", str);
    console.log("transcript", commands);
    for (var i = 0; i < commands.length; i++) {
      if(commands[i] !== ""){
        if (str.indexOf(commands[i]) > -1){
            console.log("FOUND");
            return true;
        }
      }
    }
    return false;
  };
    
  var processed = false;
  if (userSaid("bad", transcript.split(" ")) && userSaid("kids", transcript.split(" "))) {
      var sound = new Howl({
        urls: ['sounds/badKids.mp3']
      });
      background.setContent("<h1>Leap Motion DJ</h1><h3 style='color: #7CD3A2;'>Bad Kids</h3>");
      processed = true;
  }
  else if (userSaid("titanium", transcript.split(" "))) {
      var sound = new Howl({
        urls: ['sounds/titanium.mp3']
      });
      background.setContent("<h1>Leap Motion DJ</h1><h3 style='color: #7CD3A2;'>Titanium</h3>");
      processed = true;
  }
  else if (userSaid("queen", transcript.split(" "))) {
      var sound = new Howl({
        urls: ['sounds/queen.mp3']
      });
      background.setContent("<h1>Leap Motion DJ</h1><h3 style='color: #7CD3A2;'>Q.U.E.E.N.</h3>");
      processed = true;
  }
  else if (userSaid("stay", transcript.split(" "))) {
      var sound = new Howl({
        urls: ['sounds/stay.mp3']
      });
      background.setContent("<h1>Leap Motion DJ</h1><h3 style='color: #7CD3A2;'>Stay</h3>");
      processed = true;
  }
  else if (userSaid("young", transcript.split(" ")) && userSaid("and", transcript.split(" ")) && userSaid("beautiful", transcript.split(" "))) {
      var sound = new Howl({
        urls: ['sounds/youngAndBeautiful.mp3']
      });
      background.setContent("<h1>Leap Motion DJ</h1><h3 style='color: #7CD3A2;'>Young and Beautiful</h3>");
      processed = true;
  }
  else if (userSaid("play", transcript.split(" "))) {
      sound.play();
      turnFeedback.setContent("play");
      processed = true;
  }
  else if (userSaid("pause", transcript.split(" "))) {
      sound.pause();
      turnFeedback.setContent("pause");
      processed = true;
  }
  else if (userSaid("stop", transcript.split(" "))) {
      sound.stop();
      turnFeedback.setContent("stop");
      processed = true;
  }

  return processed;
};

// TODO: 4.4, Player's turn
// Generate CPU speech feedback when player takes a shot
var registerPlayerShot = function() {
  // TODO: CPU should respond if the shot was off-board
  if (!selectedTile) {
  }

  // If aiming at a tile, register the player's shot
  else {
    var shot = new Shot({position: selectedTile});
    var result = cpuBoard.fireShot(shot);

    // Duplicate shot
    if (!result) return;

    // TODO: Generate CPU feedback in three cases
    // Game over
    if (result.isGameOver) {
      gameState.endGame("player");
      return;
    }
    // Sunk ship
    else if (result.sunkShip) {
      var shipName = result.sunkShip.get('type');
    }
    // Hit or miss
    else {
      var isHit = result.shot.get('isHit');
    }

    if (!result.isGameOver) {
      // TODO: Uncomment nextTurn to move onto the CPU's turn
      // nextTurn();
    }
  }
};

// // TODO: 4.5, CPU's turn
// // Generate CPU shot as speech and blinking
// var cpuShot;
// var generateCpuShot = function() {
//   // Generate a random CPU shot
//   cpuShot = gameState.getCpuShot();
//   var tile = cpuShot.get('position');
//   var rowName = ROWNAMES[tile.row]; // e.g. "A"
//   var colName = COLNAMES[tile.col]; // e.g. "5"

//   // TODO: Generate speech and visual cues for CPU shot
// };

// // TODO: 4.5, CPU's turn
// // Generate CPU speech in response to the player's response
// // E.g. CPU takes shot, then player responds with "hit" ==> CPU could then say "AWESOME!"
// var registerCpuShot = function(playerResponse) {
//   // Cancel any blinking
//   unblinkTiles();
//   var result = playerBoard.fireShot(cpuShot);

//   // NOTE: Here we are using the actual result of the shot, rather than the player's response
//   // In 4.6, you may experiment with the CPU's response when the player is not being truthful!

//   // TODO: Generate CPU feedback in three cases
//   // Game over
//   if (result.isGameOver) {
//     gameState.endGame("cpu");
//     return;
//   }
//   // Sunk ship
//   else if (result.sunkShip) {
//     var shipName = result.sunkShip.get('type');
//   }
//   // Hit or miss
//   else {
//     var isHit = result.shot.get('isHit');
//   }

//   if (!result.isGameOver) {
//     // TODO: Uncomment nextTurn to move onto the player's next turn
//     // nextTurn();
//   }
// };

