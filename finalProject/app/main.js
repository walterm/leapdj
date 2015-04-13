// GAME SETUP
var initialState = SKIPSETUP ? "playing" : "setup";
var gameState = new GameState({state: initialState});
var cpuBoard = new Board({autoDeploy: true, name: "cpu"});
var playerBoard = new Board({autoDeploy: SKIPSETUP, name: "player"});
var cursor = new Cursor();

// UI SETUP
setupUserInterface();

// selectedTile: The tile that the player is currently hovering above
var selectedTile = false;

// grabbedShip/Offset: The ship and offset if player is currently manipulating a ship
var grabbedShip = false;
var grabbedOffset = [0, 0];

// isGrabbing: Is the player's hand currently in a grabbing pose
var isGrabbing = false;
var sound = new Howl({
        urls: ['sounds/queen.mp3']
      });
//probably move into main loop
var volume = sound.volume();
var pos = sound.pos();
console.log(volume);
console.log(pos);

// MAIN GAME LOOP
// Called every time the Leap provides a new frame of data
/*Leap.loop({ hand: function(hand) {
  // Clear any highlighting at the beginning of the loop
  unhighlightTiles();

  // TODO: 4.1, Moving the cursor with Leap data
  // Use the hand data to control the cursor's screen position
  var screenPosition = hand.screenPosition();

  // making vertical movements parallel to the leap instead of perpendicular to the leap
  screenPosition[1] = screenPosition[2];

  var cursorPosition = [screenPosition[0], screenPosition[1]];
  cursor.setScreenPosition(cursorPosition);

  // TODO: 4.1
  // Get the tile that the player is currently selecting, and highlight it
  selectedTile = getIntersectingTile(screenPosition);
  if(selectedTile !== false) {
    highlightTile(selectedTile, Colors.GREEN);
  }
  // SETUP mode
  if (gameState.get('state') == 'setup') {
    background.setContent("<h1>battleship</h1><h3 style='color: #7CD3A2;'>deploy ships</h3>");
    // TODO: 4.2, Deploying ships
    //  Enable the player to grab, move, rotate, and drop ships to deploy them

    // First, determine if grabbing pose or not
    isGrabbing = hand.grabStrength > 0.9;
    
    // Grabbing, but no selected ship yet. Look for one.
    // TODO: Update grabbedShip/grabbedOffset if the user is hovering over a ship
    if (!grabbedShip && isGrabbing) {
      grabbedShip = getIntersectingShipAndOffset(screenPosition);
    }

    // Has selected a ship and is still holding it
    // TODO: Move the ship
    else if (grabbedShip && isGrabbing) {
      grabbedShip.ship.setScreenPosition([screenPosition[0] - grabbedShip.offset[0], screenPosition[1] - grabbedShip.offset[1]]);
      grabbedShip.ship.setScreenRotation(hand.roll());
    }

    // Finished moving a ship. Release it, and try placing it.
    // TODO: Try placing the ship on the board and release the ship
    else if (grabbedShip && !isGrabbing) {
      placeShip(grabbedShip.ship);
      grabbedShip = false;
    }
  }

  // PLAYING or END GAME so draw the board and ships (if player's board)
  // Note: Don't have to touch this code
  else {
    if (gameState.get('state') == 'playing') {
      background.setContent("<h1>battleship</h1><h3 style='color: #7CD3A2;'>game on</h3>");
      turnFeedback.setContent(gameState.getTurnHTML());
    }
    else if (gameState.get('state') == 'end') {
      var endLabel = gameState.get('winner') == 'player' ? 'you won!' : 'game over';
      background.setContent("<h1>battleship</h1><h3 style='color: #7CD3A2;'>"+endLabel+"</h3>");
      turnFeedback.setContent("");
    }

    var board = gameState.get('turn') == 'player' ? cpuBoard : playerBoard;
    // Render past shots
    board.get('shots').forEach(function(shot) {
      var position = shot.get('position');
      var tileColor = shot.get('isHit') ? Colors.RED : Colors.YELLOW;
      highlightTile(position, tileColor);
    });

    // Render the ships
    playerBoard.get('ships').forEach(function(ship) {
      if (gameState.get('turn') == 'cpu') {
        var position = ship.get('position');
        var screenPosition = gridOrigin.slice(0);
        screenPosition[0] += position.col * TILESIZE;
        screenPosition[1] += position.row * TILESIZE;
        ship.setScreenPosition(screenPosition);
        if (ship.get('isVertical'))
          ship.setScreenRotation(Math.PI/2);
      } else {
        ship.setScreenPosition([-500, -500]);
      }
    });

    // If playing and CPU's turn, generate a shot
    if (gameState.get('state') == 'playing' && gameState.isCpuTurn() && !gameState.get('waiting')) {
      gameState.set('waiting', true);
      generateCpuShot();
    }
  }
}}).use('screenPosition', {scale: LEAPSCALE});
*/
// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input: 
//    transcript, a string of possibly multiple words that were recognized
// Output: 
//    processed, a boolean indicating whether the system reacted to the speech or not
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

// TODO: 4.5, CPU's turn
// Generate CPU shot as speech and blinking
var cpuShot;
var generateCpuShot = function() {
  // Generate a random CPU shot
  cpuShot = gameState.getCpuShot();
  var tile = cpuShot.get('position');
  var rowName = ROWNAMES[tile.row]; // e.g. "A"
  var colName = COLNAMES[tile.col]; // e.g. "5"

  // TODO: Generate speech and visual cues for CPU shot
};

// TODO: 4.5, CPU's turn
// Generate CPU speech in response to the player's response
// E.g. CPU takes shot, then player responds with "hit" ==> CPU could then say "AWESOME!"
var registerCpuShot = function(playerResponse) {
  // Cancel any blinking
  unblinkTiles();
  var result = playerBoard.fireShot(cpuShot);

  // NOTE: Here we are using the actual result of the shot, rather than the player's response
  // In 4.6, you may experiment with the CPU's response when the player is not being truthful!

  // TODO: Generate CPU feedback in three cases
  // Game over
  if (result.isGameOver) {
    gameState.endGame("cpu");
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
    // TODO: Uncomment nextTurn to move onto the player's next turn
    // nextTurn();
  }
};

