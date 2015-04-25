var isPlaying = false;
var processSpeech = function(transcript, sound) {
  // Helper function to detect if any commands appear in a string
  var userSaid = function(str, commands) {
    if (str === "") {
      return false;
    }

    for (var i = 0; i < commands.length; i++) {
      if(commands[i] !== ""){
        if (commands[i].indexOf(str) > -1){
            console.log("transcript", transcript);
            return true;
        }
      }
    }
    return false;
  };
    
  var processed = false;
  if (userSaid("bad", transcript.split(" ")) && userSaid("kids", transcript.split(" "))) {
      sound = new Howl({
        urls: ['finalProject/sounds/badKids.mp3']
      });
      song = "badKids";
      processed = true;
  }
  else if (userSaid("titanium", transcript.split(" "))) {
      sound = new Howl({
        urls: ['finalProject/sounds/titanium.mp3']
      });
      song = "titanium";
      processed = true;
  }
  else if (userSaid("queen", transcript.split(" "))) {
      sound = new Howl({
        urls: ['finalProject/sounds/queen.mp3']
      });
      song = "queen";
      processed = true;
  }
  else if (userSaid("stay", transcript.split(" "))) {
      sound = new Howl({
        urls: ['finalProject/sounds/stay.mp3']
      });
      song = "stay";
      processed = true;
  }
  else if (userSaid("young", transcript.split(" ")) && userSaid("and", transcript.split(" ")) && userSaid("beautiful", transcript.split(" "))) {
      sound = new Howl({
        urls: ['finalProject/sounds/youngAndBeautiful.mp3']
      });
      song = "youngAndBeautiful";
      processed = true;
  }
  else if (userSaid("play", transcript.split(" "))) {
      if (!isPlaying) {
        sound.play();
        isPlaying = true;
      }
      processed = true;
  }
  else if (userSaid("paws", transcript.split(" "))) {
      sound.pause();
      isPlaying = false;
      processed = true;
  }
  else if (userSaid("stop", transcript.split(" "))) {
      sound.stop();
      isPlaying = false;
      processed = true;
  }

  result = {processed: processed,
            sound: sound}
  return result;
};