// Selectors
const body = document.body;
const workIndicator = document.getElementById("work-indicator");
const breakIndicator = document.getElementById("break-indicator");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const alarmSound = new Audio("alarm.mp3"); // Add an alarm sound

// Time Configurations
const workTime = 25; // in minutes
const breakTime = 5; // in minutes

let isBreak = false;
let secondsRemaining = 0;
let interval;
let isPaused = false;

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
  if (interval) return;

  startButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  resetButton.style.display = "inline-block";

  let minutesRemaining = isBreak ? breakTime - 1 : workTime - 1;
  secondsRemaining = 59;

  interval = setInterval(() => {
    if (!isPaused) {
      updateDisplay(minutesRemaining, secondsRemaining);
      secondsRemaining--;

      if (secondsRemaining < 0) {
        secondsRemaining = 59;
        minutesRemaining--;

        if (minutesRemaining < 0) {
          clearInterval(interval);
          interval = null;
          alarmSound.play();
          isBreak = !isBreak;
          minutesRemaining = isBreak ? breakTime - 1 : workTime - 1;
          toggleMode();
          startTimer();
        }
      }

      updateBackground();
    }
  }, 1000);
}

// Pause Timer
function pauseTimer() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

// Reset Timer
function resetTimer() {
  clearInterval(interval);
  interval = null;
  isBreak = false;
  isPaused = false;
  initializeTimer();
  toggleMode();
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
  resetButton.style.display = "none";
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

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Initialize Timer on Load
window.onload = initializeTimer;
