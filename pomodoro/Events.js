// Events.js
import {
  initializeTimer,
  startTimer,
  pauseTimer,
  resetTimer,
} from "./Timer.js";

function setupEventListeners() {
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  const resetButton = document.getElementById("reset-button");

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  document.addEventListener("DOMContentLoaded", initializeTimer);
}

export { setupEventListeners };
