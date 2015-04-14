function volumeLevel (difference) {
    return Math.max(Math.min( (1/500.0) * difference + 0.5, 1), 0);
}

function swipeListener (gesture) {
    var duration = gesture.duration,
        direction = gesture.direction[2] < 0 ? 1: -1,
        isHorizontal, difference;

    difference = direction * Math.abs(gesture.position[2] - gesture.startPosition[2]);

    isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[2]);
    if (!isHorizontal) {
        var newVolume = volumeLevel(difference),
            pos = sound.pos();
        sound.pause();
        sound.play(function (id) {
            console.log("lowering volume", newVolume);
            sound.volume(newVolume);
            sound.pos(pos, id);
        });
    } else {
        // TODO: crossfade volume for second disc
    }
}

// TODO: automate this process
function getSongLength (song) {
    var songMap = {
        "badKids": 130000,
        "titanium": 245000000,
        "queen": 312000000,
        "stay": 241000000,
        "youngAndBeautiful": 256000000
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