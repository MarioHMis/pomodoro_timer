class PomodoroTimer {
  constructor() {
    // Selectores del DOM
    this.workIndicator = document.getElementById("work-indicator");
    this.breakIndicator = document.getElementById("break-indicator");
    this.startButton = document.getElementById("start-button");
    this.pauseButton = document.getElementById("pause-button");
    this.resetButton = document.getElementById("reset-button");
    this.minutesDisplay = document.getElementById("minutes");
    this.secondsDisplay = document.getElementById("seconds");
    this.alarmSound = new Audio("alarm.mp3"); // Sonido de alarma

    // Configuración del temporizador
    this.WORK_TIME = 25; // Minutos de trabajo
    this.BREAK_TIME = 5; // Minutos de descanso
    this.isBreak = false;
    this.secondsRemaining = 0;
    this.interval = null;
    this.isPaused = false;

    // Event Listeners
    this.startButton.addEventListener("click", () => this.startTimer());
    this.pauseButton.addEventListener("click", () => this.pauseTimer());
    this.resetButton.addEventListener("click", () => this.resetTimer());

    // Inicializar el temporizador al cargar
    window.onload = () => this.initializeTimer();
  }

  /**
   * Inicializa el temporizador con los valores predeterminados.
   */
  initializeTimer() {
    try {
      this.updateDisplay(this.WORK_TIME, 0);
      this.toggleMode();
    } catch (error) {
      console.error("Error al inicializar el temporizador:", error);
    }
  }

  /**
   * Actualiza el display con minutos y segundos formateados.
   * @param {number} minutes - Minutos a mostrar.
   * @param {number} seconds - Segundos a mostrar.
   */
  updateDisplay(minutes, seconds) {
    this.minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    this.secondsDisplay.textContent = seconds.toString().padStart(2, "0");
  }

  /**
   * Inicia el temporizador y gestiona la cuenta regresiva.
   */
  startTimer() {
    try {
      if (this.interval) return;

      this.startButton.style.display = "none";
      this.pauseButton.style.display = "inline-block";
      this.resetButton.style.display = "inline-block";

      let minutesRemaining = this.isBreak
        ? this.BREAK_TIME - 1
        : this.WORK_TIME - 1;
      this.secondsRemaining = 59;

      this.interval = setInterval(() => {
        if (!this.isPaused) {
          this.updateDisplay(minutesRemaining, this.secondsRemaining);
          this.secondsRemaining--;

          if (this.secondsRemaining < 0) {
            this.secondsRemaining = 59;
            minutesRemaining--;

            if (minutesRemaining < 0) {
              clearInterval(this.interval);
              this.interval = null;
              this.alarmSound.play();
              this.isBreak = !this.isBreak;
              minutesRemaining = this.isBreak
                ? this.BREAK_TIME - 1
                : this.WORK_TIME - 1;
              this.toggleMode();
              this.startTimer();
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
  pauseTimer() {
    try {
      this.isPaused = !this.isPaused;
      this.pauseButton.textContent = this.isPaused ? "Resume" : "Pause";
    } catch (error) {
      console.error("Error al pausar el temporizador:", error);
    }
  }

  /**
   * Resetea el temporizador a su estado inicial.
   */
  resetTimer() {
    try {
      clearInterval(this.interval);
      this.interval = null;
      this.isBreak = false;
      this.isPaused = false;
      this.initializeTimer();
      this.startButton.style.display = "inline-block";
      this.pauseButton.style.display = "none";
      this.resetButton.style.display = "none";
    } catch (error) {
      console.error("Error al reiniciar el temporizador:", error);
    }
  }

  /**
   * Cambia el estado entre "Trabajo" y "Descanso".
   */
  toggleMode() {
    try {
      if (this.isBreak) {
        this.workIndicator.classList.replace(
          "pomodoro__indicator--active",
          "pomodoro__indicator--inactive"
        );
        this.breakIndicator.classList.replace(
          "pomodoro__indicator--inactive",
          "pomodoro__indicator--active"
        );
      } else {
        this.breakIndicator.classList.replace(
          "pomodoro__indicator--active",
          "pomodoro__indicator--inactive"
        );
        this.workIndicator.classList.replace(
          "pomodoro__indicator--inactive",
          "pomodoro__indicator--active"
        );
      }
    } catch (error) {
      console.error("Error al cambiar el modo de trabajo/descanso:", error);
    }
  }
}

// Instanciar la clase cuando cargue la página
document.addEventListener("DOMContentLoaded", () => new PomodoroTimer());
