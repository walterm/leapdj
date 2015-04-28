function volumeDeltaLevel (velocity) {
    var slope = (0.5 - 0.01) / (800 - 60);
    return slope * (velocity - 800) + 0.5;
}

function crossfadeLevel (position) {
    var slope = (-1) / (300.0);
    return slope * (position + 150) + 1;
}

function deltaLevel (duration) {
    delta = (20/100000) * (duration - 100000) + 20;
    return Math.round(delta);
}

function updatePlayBar(sound, song) {
    if(sound !== undefined) {
        console.log()
        var pos = sound.pos(),
            length = getSongLength(song),
            progress;

        progress = pos / length;
        progress = Math.round(progress*100);
        $(".seek").css("width", progress + "%");
    }
}

function swipeListener (gesture, sound, song) {
    var songLength = getSongLength(song),
        duration = gesture.duration,
        orientation = gesture.direction[2] > 0 ? 1 : -1,
        start = sound.pos(),
        delta;

    delta = orientation*deltaLevel(duration);
    console.log(delta);
    sound.pause();
    sound.play(function (id) {
        sound.pos(Math.min(Math.max(start + delta, 0), songLength-1), id);
    });
}

// TODO: automate this process
function getSongLength (song) {
    var songMap = {
        "badKids": 130,
        "titanium": 245,
        "queen": 312,
        "stay": 241,
        "youngAndBeautiful": 256
    };
    return songMap[song];
}

function volumeListener(hand) {
    if(hand.type === "left"){
        if( Math.abs(hand.palmVelocity[2]) > 20.0 && sound !== undefined) {
            console.log("adjusting left");
            var volumeDelta = volumeDeltaLevel(Math.abs(hand.palmVelocity[2]));
            var dir = hand.palmVelocity[2] > 0 ? -1 : 1;
            volumeDelta *= dir;
            changeVolume(volumeDelta, sound);
            updateVolumeBar("vol1", sound.volume());
        }
    } else if (hand.type === "right") {
        if( Math.abs(hand.palmVelocity[2]) > 20.0 && sound2 !== undefined) {
            var volumeDelta = volumeDeltaLevel(Math.abs(hand.palmVelocity[2]));
            var dir = hand.palmVelocity[2] > 0 ? -1 : 1;
            volumeDelta *= dir;
            changeVolume(volumeDelta, sound2);
            updateVolumeBar("vol2", sound2.volume());
        }
    }
}

function crossfadeListener(hand, sound, sound2) {
    if(soundPlaybackId1 !== undefined && soundPlaybackId2 !== undefined) {
        console.log(soundPlaybackId1, sound);
        console.log(soundPlaybackId2, sound2);
        var position = hand.palmPosition[0];
        position = Math.max(-150, position);
        position = Math.min(150, position);
        var pos1 = sound.pos(),
            pos2 = sound2.pos();

        sound.pause();
        sound.play(function (id) {
            sound.volume(crossfadeLevel(position));
            sound.pos(pos1, id);
        });

        sound2.pause();
        sound2.play(function (id) {
            sound2.volume(1.0 - crossfadeLevel(position));
            sound2.pos(pos2, id);
        });

        updateVolumeBar("vol1", sound.volume());
        updateVolumeBar("vol2", sound2.volume());
    }
}

function changeVolume (volumeDelta, soundObj) {
    var pos = soundObj.pos(),
        vol = soundObj.volume();

    soundObj.pause();
    soundObj.play(function (id) {
        var newVolume = Math.min(vol+volumeDelta, 1);
        newVolume = Math.max(newVolume, 0);
        soundObj.volume(newVolume);
        soundObj.pos(pos, id);
        //updateVolumeBar(newVolume);
        console.log("newVolume", soundObj.volume());
    });
}