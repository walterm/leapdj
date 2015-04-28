String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}

function computeMarginTop(volume) {
    return Math.round(-240 * volume + 240);
}

function updateVolumeBar (cls, newVolume) {
    if(newVolume !== undefined){
        var vol = Math.round(newVolume*100)/100;
        vol = Math.round(vol*100);
        $("."+cls).css("margin-top", computeMarginTop(newVolume) + "px");
        $("."+cls).html(vol + "%");
    }
}

function highlightSelectedSong (cls, id) {
    $("." +cls).removeClass(cls);
    $("#"+id).addClass(cls);
}

function highlightIcon (cls, icon) {
    $("." + cls).removeClass(cls);
    $("#"+icon).addClass(cls);
}

function initKnob (id, soundObj, songName) {
     jQuery(document).ready(function($){
        $(id).removeClass('sr-only');
        $(id).knob({
            min: 0,
            max: getSongLength(songName),
            fgColor: id === ".dial1" ? '#d9534f' : '#5cb85c',
            draw: function() { $(this.i).val($(this.i).val().toString().toHHMMSS());},
            readOnly: true,
        });
    });
}


function updateKnob (id, soundObj, songName) {
    if(soundObj !== undefined){
        var time = Math.round(soundObj.pos()).toString();
        var timeStr = time.toHHMMSS();

        $(id).val(time).trigger("change");
    }
}