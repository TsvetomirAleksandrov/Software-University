function roadRadar([speed, area]) {
    let allowedSpeeds = {
        'motorway': 130,
        'interstate': 90,
        'city': 50,
        'residential': 20
    }

    if (speed > allowedSpeeds[area]) {
        let speeding = speed - allowedSpeeds[area];
        logSpeeding(speeding);
    }


    function logSpeeding(speeding) {
        if (speeding <= 20) {
            console.log('speeding');
        }
        else if (speeding <= 40) {
            console.log('excessive speeding');
        }
        else {
            console.log('reckless driving');
        }
    }
}
