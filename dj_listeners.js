function volumeLevel (difference) {
    return Math.max(Math.min( (1/500.0) * difference + 0.5, 1), 0);
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

function updateVolumeBar (newVolume) {
    if(newVolume !== undefined){
        var vol = Math.round(newVolume*100)/100;
        vol = Math.round(vol*100);
        $(".volume > .progress-bar").css("width", vol + "%");
        $(".volume > .progress-bar").html(vol + "%");
    }
}

function swipeListener (gesture) {
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

function circleListener (gesture) {
    var songLength = getSongLength(song),
        progress = gesture.progress,
        orientation = gesture.normal[1] > 0 ? -1 : 1,
        start = sound.pos(),
        delta;

    // TODO: define this parameter
    delta = Math.min(progress * 5 * orientation, songLength);
    sound.pause();
    sound.play(function (id) {
        sound.pos(start + delta, id);
    });
}