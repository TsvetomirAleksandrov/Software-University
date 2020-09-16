function timeToWalk(numberOfSteps, footprintLengthInMeters, speedInKmph) {
    let distanceInMeters = numberOfSteps * footprintLengthInMeters;
    let speedInMeterPerSec = speedInKmph / 3.6;
    let time = distanceInMeters / speedInMeterPerSec;
    let rest = Math.floor(distanceInMeters / 500);

    let timeMin = Math.floor(time / 60);
    let timeSec = Math.round(time - (timeMin * 60));
    let timeHr = Math.floor(time / 3600);

    console.log((timeHr < 10 ? "0" : "") + timeHr + ":" + (timeMin + rest < 10 ? "0" : "") + (timeMin + rest) + ":" + (timeSec < 10 ? "0" : "") + timeSec);
}