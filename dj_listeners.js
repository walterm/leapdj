function volumeDeltaLevel (velocity) {
    var slope = (0.5 - 0.01) / (800 - 60);
    return slope * (velocity - 800) + 0.5;
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

function changeVolume (volumeDelta, sound) {
    var pos = sound.pos(),
        vol = sound.volume();

    sound.pause();
    sound.play(function (id) {
        var newVolume = Math.min(vol+volumeDelta, 1);
        newVolume = Math.max(newVolume, 0);
        sound.volume(newVolume);
        sound.pos(pos, id);
        //updateVolumeBar(newVolume);
        console.log("newVolume", sound.volume());
    });
}