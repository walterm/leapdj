var isPlaying = false;
var processSpeech = function(transcript, sound) {
  // Helper function to detect if any commands appear in a string
  var userSaid = function(str, commands) {
    if (str === "") {
      return false;
    }

    for (var i = 0; i < commands.length; i++) {
      if(commands[i] !== ""){
        if (commands[i] === str){
            return true;
        }
      }
    }
    return false;
  };

  // BECAUSE WEBKIT IS A WHORE
  var discB = function(array) {
    return userSaid("B", array) || userSaid("bee", array) || userSaid("be", array);
  };

  var discA = function(array) {
    return userSaid("a", array);
  };

  var disc = function (array) {
    return userSaid("disc", array) || userSaid("disk", array) || userSaid("discs", array);
  }

  var userSaidDisc = function(array) {
    if (discA(array)) {
      return "A"
    } else if (discB(array)) {
      return "B"
    } else return undefined;
  }
    
  var processed = false;
  if(userSaid("play", transcript.split(" "))) {
    console.log(transcript);
    
      var cutoff = transcript.split(" ").slice(transcript.indexOf("play") + 1); // this will be empty if play is the last word

      if(userSaid("queen", cutoff) || userSaid("Queen", cutoff)) {
        if(disc(cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/queen.mp3']
          });
          song = "queen";
        } else if (disc(cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/queen.mp3']
          });
          song2 = "queen";
        }

        
        processed = true;
      } else if (userSaid("titanium", cutoff)) {

        if(disc(cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/titanium.mp3']
          });
          song = "titanium";
        } else if (disc(cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/titanium.mp3']
          });
          song2 = "titanium";
        }
         processed = true;
      } else if (disc(cutoff) && userSaid("kids", cutoff)) {
        if(disc(cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/badKids.mp3']
          });
          song = "badKids";
        } else if (disc(cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/badKids.mp3']
          });
        }
        song2 = "badKids";
        processed = true;
      } else if (userSaid("young", cutoff) && userSaid("and", cutoff) && userSaid("beautiful", cutoff)) {
        if(disc(cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/youngAndBeautiful.mp3']
          });
          song = "youngAndBeautiful";
        } else if (disc(cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/youngAndBeautiful.mp3']
          });
          song2 = "youngAndBeautiful";
        }
        processed = true;
      } else if (userSaid("stay", cutoff)) {
        if(disc(cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/stay.mp3']
          });
          song = "stay";
        } else if (disc(cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/stay.mp3']
          });
          song2 = "stay";
        }
        processed = true;
      } else if(userSaidDisc(cutoff) !== undefined) {
        var result = userSaidDisc(cutoff);
        result === "A" ? sound.play(pos1) : sound2.play(pos2);
      }


    if(disc(cutoff) && userSaid("a", cutoff)) {
      if(soundPlaybackId1 !== undefined){
        soundPlaybackId1.stop();
      }
        
      soundPlaybackId1 = sound.play();
      highlightSelectedSong("selected-A", song);
      highlightIcon("icon-selected-a", "play-a");
      initKnob(".dial1", sound, song);
    } else if (disc(cutoff) && discB(cutoff)) {  
      if(soundPlaybackId2 !== undefined){
        soundPlaybackId2.stop();
      }
      
      soundPlaybackId2 = sound2.play();
      highlightSelectedSong("selected-B", song2);
      highlightIcon("icon-selected-b", "play-b");
      initKnob(".dial2", sound2, song2);
    }
     
  } else if (userSaid("paws", transcript.split(" "))) {
    var result = userSaidDisc(transcript.split(" "));
    if(result !== undefined) {
      if(result === "A") {
        pos1 = sound.pos();
        sound.pause();
        highlightIcon("icon-selected-a", "pause-a");
      } else {
        pos2 = sound2.pos();
        sound2.pause();
        highlightIcon("icon-selected-b", "pause-b");
      }
      processed = true;
    }

  }
  else if (userSaid("stop", transcript.split(" "))) {
    var result = userSaidDisc(transcript.split(" "));
    if(result !== undefined) {
      if(result === "A") {
        sound.stop();
        highlightIcon("icon-selected-a", "stop-a");
        soundPlaybackId1 = undefined;
      } else {
        sound2.stop();
        highlightIcon("icon-selected-b", "stop-b");
        soundPlaybackId2 = undefined;
      }
      processed = true;
    }
  }

  result = {processed: processed,
            sound: sound}
  return result;
};