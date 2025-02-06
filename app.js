const PomodoroTimer = (function () {
  // Variables privadas
  let isBreak = false;
  let secondsRemaining = 0;
  let interval = null;
  let isPaused = false;

  // Configuración del temporizador
  const WORK_TIME = 25; // Minutos de trabajo
  const BREAK_TIME = 5; // Minutos de descanso

  // Selectores del DOM
  const workIndicator = document.getElementById("work-indicator");
  const breakIndicator = document.getElementById("break-indicator");
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  const resetButton = document.getElementById("reset-button");
  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const alarmSound = new Audio("alarm.mp3"); // Sonido de alarma

  /**
   * Actualiza el display con minutos y segundos formateados.
   * @param {number} minutes - Minutos a mostrar.
   * @param {number} seconds - Segundos a mostrar.
   */
  function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
  }

  /**
   * Inicializa el temporizador con los valores predeterminados.
   */
  function initializeTimer() {
    try {
      updateDisplay(WORK_TIME, 0);
      toggleMode();
    } catch (error) {
      console.error("Error al inicializar el temporizador:", error);
    }
  }

  /**
   * Inicia el temporizador y gestiona la cuenta regresiva.
   */
  function startTimer() {
    try {
      if (interval) return;

      startButton.style.display = "none";
      pauseButton.style.display = "inline-block";
      resetButton.style.display = "inline-block";

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
              alarmSound.play();
              isBreak = !isBreak;
              minutesRemaining = isBreak ? BREAK_TIME - 1 : WORK_TIME - 1;
              toggleMode();
              startTimer();
            }
          }
        }
      }, 1000);
    } catch (error) {
      console.error("Error al iniciar el temporizador:", error);
    }
  }

  /**
   * Pausa o reanuda el temporizador.
   */
  function pauseTimer() {
    try {
      isPaused = !isPaused;
      pauseButton.textContent = isPaused ? "Resume" : "Pause";
    } catch (error) {
      console.error("Error al pausar el temporizador:", error);
    }
  }

  /**
   * Resetea el temporizador a su estado inicial.
   */
  function resetTimer() {
    try {
      clearInterval(interval);
      interval = null;
      isBreak = false;
      isPaused = false;
      initializeTimer();
      startButton.style.display = "inline-block";
      pauseButton.style.display = "none";
      resetButton.style.display = "none";
    } catch (error) {
      console.error("Error al reiniciar el temporizador:", error);
    }
  }

  /**
   * Cambia el estado entre "Trabajo" y "Descanso".
   */
  function toggleMode() {
    try {
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
    } catch (error) {
      console.error("Error al cambiar el modo de trabajo/descanso:", error);
    }
  }

  // Event Listeners
  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  // Inicializar el temporizador al cargar
  document.addEventListener("DOMContentLoaded", initializeTimer);

  // Métodos públicos (para pruebas si se requieren)
  return {
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
    init: initializeTimer,
  };
})();
