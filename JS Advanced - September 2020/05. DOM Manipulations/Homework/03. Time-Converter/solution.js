function attachEventsListeners() {
    let main = document.getElementsByTagName('main')[0];

    main.addEventListener('click', convert);

    let toSeconds = {
        'daysBtn': value => value * 86400,
        'hoursBtn': value => value * 3600,
        'minutesBtn': value => value * 60,
        'secondsBtn': value => value
    }

    function convert(e) {
        if (e.target.type === 'button') {
            let seconds = toSeconds[e.target.id](e.target.parentNode.children[1].value);
            document.getElementById('seconds').value = seconds;
            document.getElementById('minutes').value = seconds / 60;
            document.getElementById('hours').value = seconds / 3600;
            document.getElementById('days').value = seconds / 86400;
        }
    }
}