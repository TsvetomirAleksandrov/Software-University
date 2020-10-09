function stopwatch() {
    let startButton = document.getElementById('startBtn');
    let stopButton = document.getElementById('stopBtn');
    let time = document.getElementById('time');
    let timer = 0;

    startButton.addEventListener('click', () => { time.textContent = '00:00'; timer = setInterval(addSec, 1000); startButton.disabled = true; stopButton.disabled = false; });
    stopButton.addEventListener('click', () => { clearInterval(timer); startButton.disabled = false; stop.disabled = true; });

    let seconds = 0;
    let minutes = 0;

    function addSec() {
        seconds++;
        if (seconds < 10) {
            seconds = `0` + seconds;
        }
        if (seconds >= 60) {
            seconds = `0` + 0;
            minutes++;
            if (minutes < 10) {
                minutes = `0` + minutes;
            }
        }
        if (minutes === 0) {
            minutes = `0` + minutes;
        }
        time.textContent = `${minutes}:${seconds}`;
    }
}