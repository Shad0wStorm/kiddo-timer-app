import { CountdownTimer } from "./timer.js";

const form = document.getElementById("timer-form");
const display = document.getElementById("timer-display");
const themeSelect = document.getElementById("theme-select");
const canvas = document.getElementById("confetti-canvas");

let currentTimer = null;
let currentTheme = "unicorn";

const confettiPresets = {
    unicorn: {
        colors: ['#ff69b4', '#ffb6c1', '#ffffff', '#f0e68c'],
        particleCount: 5,
        angle: 60,
        spread: 70,
        gravity: 0.3
    },
    frozen: {
        colors: ['#cceeff', '#99ddff', '#ffffff'],
        particleCount: 4,
        angle: 90,
        spread: 50,
        gravity: 0.25
    },
    minnie: {
        colors: ['#ff1493', '#ffffff', '#000000'],
        particleCount: 6,
        angle: 120,
        spread: 60,
        gravity: 0.35
    },
    insideout: {
        colors: ['#ff6b6b', '#feca57', '#54a0ff', '#5f27cd', '#10ac84'],
        particleCount: 7,
        angle: 90,
        spread: 80,
        gravity: 0.4
    }
};

const startStopBtn = document.getElementById("start-stop-btn");

startStopBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentTimer) {
        currentTimer.stop();
        currentTimer = null;
        display.textContent = "Stopped";
        startStopBtn.textContent = "Start";
        return;
    }

    let minutesInput = document.getElementById("minutes");
    let secondsInput = document.getElementById("seconds");

    if (secondsInput.value && (!minutesInput.value || minutesInput.value.trim() === "")) {
        minutesInput.value = "0";
    }

    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        alert("Set a time greater than 0!");
        return;
    }

    currentTimer = new CountdownTimer(
        totalSeconds,
        (timeStr) => (display.textContent = timeStr),
        () => {
            display.textContent = "Times Up!!";
            startStopBtn.textContent = "Start";
            if (['unicorn', 'frozen', 'minnie', 'insideout'].includes(currentTheme)) {
                launchConfetti();
            }
            currentTimer = null;
        }
    );

    currentTimer.start();
    startStopBtn.textContent = "Stop!";
});

themeSelect.addEventListener("change", (e) => {
    currentTheme = e.target.value;
    document.body.className = `theme-${currentTheme}`;
});

function launchConfetti() {
    const config = confettiPresets[currentTheme];
    if (!config) return;

    canvas.style.display = "block";
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const confettiFrame = () => {
        confetti({
            particleCount: config.particleCount,
            angle: config.angle,
            spread: config.spread,
            gravity: config.gravity,
            colors: config.colors,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
        });

        if (Date.now() < end) {
            requestAnimationFrame(confettiFrame);
        } else {
            canvas.style.display = "none";
        }
    };

    confettiFrame();
}
