// Timer.js
import {
  updateDisplay,
  toggleMode,
  showButtons,
  hideButtons,
} from "./Display.js";
import { playAlarm } from "./Sound.js";

let isBreak = false;
let secondsRemaining = 0;
let interval = null;
let isPaused = false;

const WORK_TIME = 25; // Minutos de trabajo
const BREAK_TIME = 5; // Minutos de descanso

function initializeTimer() {
  updateDisplay(WORK_TIME, 0);
  toggleMode(isBreak);
}

function startTimer() {
  if (interval) return;

  showButtons("pause-reset");
  hideButtons("start");

  let minutesRemaining = isBreak ? BREAK_TIME - 1 : WORK_TIME - 1;
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
          playAlarm();
          isBreak = !isBreak;
          toggleMode(isBreak);
          minutesRemaining = isBreak ? BREAK_TIME - 1 : WORK_TIME - 1;
          startTimer();
        }
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
  const pauseButton = document.getElementById("pause-button");
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  isBreak = false;
  isPaused = false;
  initializeTimer();
  showButtons("start");
  hideButtons("pause-reset");
}

export { initializeTimer, startTimer, pauseTimer, resetTimer };
