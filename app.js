// Selectors
const body = document.body;
const workIndicator = document.getElementById("work-indicator");
const breakIndicator = document.getElementById("break-indicator");
const startButton = document.getElementById("start-button");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

// Time Configurations
const workTime = 25; // in minutes
const breakTime = 5; // in minutes

let isBreak = false;
let secondsRemaining = 0;
let interval;

// Initialize Display
function initializeTimer() {
  minutesDisplay.textContent = workTime.toString().padStart(2, "0");
  secondsDisplay.textContent = "00";
}

// Update Display
function updateDisplay(minutes, seconds) {
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

// Timer Logic
function startTimer() {
  startButton.style.display = "none";

  let minutesRemaining = isBreak ? breakTime - 1 : workTime - 1;
  secondsRemaining = 59;

  interval = setInterval(() => {
    updateDisplay(minutesRemaining, secondsRemaining);
    secondsRemaining--;

    if (secondsRemaining < 0) {
      secondsRemaining = 59;
      minutesRemaining--;

      if (minutesRemaining < 0) {
        isBreak = !isBreak;
        minutesRemaining = isBreak ? breakTime - 1 : workTime - 1;
        toggleMode();
      }
    }

    updateBackground();
  }, 1000);
}

// Switch Modes
function toggleMode() {
  if (isBreak) {
    workIndicator.classList.replace("active", "inactive");
    breakIndicator.classList.replace("inactive", "active");
  } else {
    breakIndicator.classList.replace("active", "inactive");
    workIndicator.classList.replace("inactive", "active");
  }
}

// Dynamic Background Update
function updateBackground() {
  const workGradient = 100 / workTime;
  const breakGradient = 100 / breakTime;

  let progress;
  if (isBreak) {
    progress = (breakTime - (secondsRemaining / 60 + 1)) * breakGradient;
  } else {
    progress = (workTime - (secondsRemaining / 60 + 1)) * workGradient;
  }

  body.style.background = `linear-gradient(45deg, rgba(4, 28, 50, 1) ${
    100 - progress
  }%, rgba(95, 30, 148, 1) ${progress}%)`;
}

// Event Listener
startButton.addEventListener("click", startTimer);

// Initialize Timer on Load
window.onload = initializeTimer;
