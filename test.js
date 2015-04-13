// connecting to the device
// TODO: keep the default gesture frame count?
var trainer = new LeapTrainer.Controller({minGestureFrames: 10});

// TODO: train gestures for it
// TODO: save gestures to JSON
// TODO: setup listeners for each gesture

// setting up training mode
trainer.create('Halt');

trainer.on('Halt', function () {
	console.log("Halt detected");
});

trainer.on('training-started', function (movementName) {
    console.log('Started training ' + movementName);
});

trainer.on('training-complete', function (gestureName, trainingGestures, isPose) {
	console.log("Done trainning for", gestureName);
	console.log("trainingGestures", trainingGestures);
	console.log("isPose", isPose);

	// TODO: figure out how to export this JSON into a saved file
	console.log("toJSON", trainer.toJSON('Halt'));
});

trainer.on("gesture-unknown", function (bestHit, closestGestureName){
	console.log("Unknown gesture");
	// Probability of that gesture
	console.log("bestHit", bestHit);
	// TODO: do we want to use this value anyway (if it's ever undefined)?
	console.log("closestGestureName", closestGestureName);
})


trainer.on("gesture-recognized", function (hit, gestureName){
	console.log("Known gesture");
	console.log("hit", hit);
	console.log("gestureName", gestureName);
})