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
        if(userSaid("disc", cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/queen.mp3']
          });
        } else if (userSaid("disc", cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/queen.mp3']
          });
        }

        song = "queen";
        processed = true;
      } else if (userSaid("titanium", cutoff)) {

        if(userSaid("disc", cutoff) && userSaid("a", cutoff)) {
          console.log("why am I here");
          sound = new Howl({
            urls: ['finalProject/sounds/titanium.mp3']
          });
        } else if (userSaid("disc", cutoff) && discB(cutoff)) {
          console.log("DISC B SELECTION");
          sound2 = new Howl({
            urls: ['finalProject/sounds/titanium.mp3']
          });
        }
        song = "titanium";
        processed = true;
      } else if (userSaid("bad", cutoff) && userSaid("kids", cutoff)) {
        if(userSaid("disc", cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/badKids.mp3']
          });
        } else if (userSaid("disc", cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/badKids.mp3']
          });
        }
        song = "badKids";
        processed = true;
      } else if (userSaid("young", cutoff) && userSaid("and", cutoff) && userSaid("beautiful", cutoff)) {
        if(userSaid("disc", cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/youngAndBeautiful.mp3']
          });
        } else if (userSaid("disc", cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/youngAndBeautiful.mp3']
          });
        }
        song = "youngAndBeautiful";
        processed = true;
      } else if (userSaid("stay", cutoff)) {
        if(userSaid("disc", cutoff) && userSaid("a", cutoff)) {
          sound = new Howl({
            urls: ['finalProject/sounds/stay.mp3']
          });
        } else if (userSaid("disc", cutoff) && discB(cutoff)) {
          sound2 = new Howl({
            urls: ['finalProject/sounds/stay.mp3']
          });
        }
        song = "stay";
        processed = true;
      } else if(userSaidDisc(cutoff) !== undefined) {
        var result = userSaidDisc(cutoff);
        result === "A" ? sound.play(pos1) : sound2.play(pos2);
      }


    if(userSaid("disc", cutoff) && userSaid("a", cutoff)) {
      if(soundPlaybackId1 !== undefined){
        soundPlaybackId1.stop();
      }
        
      soundPlaybackId1 = sound.play();
      console.log(soundPlaybackId1);
    } else if (userSaid("disc", cutoff) && discB(cutoff)) {  
      if(soundPlaybackId2 !== undefined){
        soundPlaybackId2.stop();
      }
      
      soundPlaybackId2 = sound2.play();
      console.log("disc B");
    }
     
  } else if (userSaid("paws", transcript.split(" "))) {
    var result = userSaidDisc(transcript.split(" "));
    if(result !== undefined) {
      if(result === "A") {
        pos1 = sound.pos();
        sound.pause();
      } else {
        pos2 = sound2.pos();
        sound2.pause();
      }
      processed = true;
    }

  }
  else if (userSaid("stop", transcript.split(" "))) {
    var result = userSaidDisc(transcript.split(" "));
    if(result !== undefined) {
      result === "A"? sound.stop() : sound2.stop();
      processed = true;
    }
  }

  result = {processed: processed,
            sound: sound}
  return result;
};