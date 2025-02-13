// Display.js

const workIndicator = document.getElementById("work-indicator");
const breakIndicator = document.getElementById("break-indicator");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

function updateDisplay(minutes, seconds) {
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function toggleMode(isBreak) {
  if (isBreak) {
    workIndicator.classList.replace(
      "pomodoro__indicator--active",
      "pomodoro__indicator--inactive"
    );
    breakIndicator.classList.replace(
      "pomodoro__indicator--inactive",
      "pomodoro__indicator--active"
    );
  } else {
    breakIndicator.classList.replace(
      "pomodoro__indicator--active",
      "pomodoro__indicator--inactive"
    );
    workIndicator.classList.replace(
      "pomodoro__indicator--inactive",
      "pomodoro__indicator--active"
    );
  }
}

function showButtons(type) {
  if (type === "pause-reset") {
    pauseButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";
  } else if (type === "start") {
    startButton.style.display = "inline-block";
  }
}

function hideButtons(type) {
  if (type === "pause-reset") {
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
  } else if (type === "start") {
    startButton.style.display = "none";
  }
}

export { updateDisplay, toggleMode, showButtons, hideButtons };
