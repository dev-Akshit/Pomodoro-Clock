document.addEventListener("DOMContentLoaded", () => {
    const sessionLength = document.getElementById("session-length");
    const breakLength = document.getElementById("break-length");
    const sessionIncrement = document.getElementById("session-increment");
    const sessionDecrement = document.getElementById("session-decrement");
    const breakIncrement = document.getElementById("break-increment");
    const breakDecrement = document.getElementById("break-decrement");
    const startButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");
    const countdownDisplay = document.querySelector(".countdown");
    const breakText = document.querySelector(".break-text");
    const sessionText = document.querySelector(".session-text");

    let sessionTime = parseInt(sessionLength.textContent);
    let breakTime = parseInt(breakLength.textContent);
    let isRunning = false;
    let timer;

    function updateSessionLength(delta) {
        sessionTime += delta;
        if (sessionTime < 0) sessionTime = 0;
        sessionLength.textContent = sessionTime;
        countdownDisplay.textContent = formatTime(sessionTime * 60);
    }

    function updateBreakLength(delta) {
        breakTime += delta;
        if (breakTime < 0) breakTime = 0;
        breakLength.textContent = breakTime;
    }

    function startSessionTimer() {
        let duration = sessionTime * 60;
        isRunning = true;

        timer = setInterval(() => {
            duration--;
            countdownDisplay.textContent = formatTime(duration);

            if (duration < 0) {
                clearInterval(timer);
                startBreakTimer();
            }
        }, 1000);

        resetButton.addEventListener("click", () => {
            clearInterval(timer);
            isRunning = false;
            countdownDisplay.textContent = formatTime(sessionTime * 60);
        });
    }

    function startBreakTimer() {
        let duration = breakTime * 60;
        isRunning = true;

        breakText.style.fontWeight = "bold";
        sessionText.style.fontWeight = "normal";

        timer = setInterval(() => {
            duration--;
            countdownDisplay.textContent = formatTime(duration);

            if (duration < 0) {
                clearInterval(timer);
                startSessionTimer();
                breakText.style.fontWeight = "normal";
                sessionText.style.fontWeight = "bold";
            }
        }, 1000);

        resetButton.addEventListener("click", () => {
            clearInterval(timer);
            isRunning = false;
            countdownDisplay.textContent = formatTime(sessionTime * 60);
            breakText.style.fontWeight = "normal";
            sessionText.style.fontWeight = "bold";
        });
    }

    function formatTime(seconds) {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    sessionIncrement.addEventListener("click", () => {
        if (!isRunning) updateSessionLength(1);
    });

    sessionDecrement.addEventListener("click", () => {
        if (!isRunning) updateSessionLength(-1);
    });

    breakIncrement.addEventListener("click", () => {
        if (!isRunning) updateBreakLength(1);
    });

    breakDecrement.addEventListener("click", () => {
        if (!isRunning) updateBreakLength(-1);
    });

    startButton.addEventListener("click", () => {
        if (!isRunning) {
            startSessionTimer();
        }
    });
});
