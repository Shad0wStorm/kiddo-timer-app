export class CountdownTimer {
  constructor(durationInSeconds, onTick, onEnd) {
    this.initialDuration = durationInSeconds;
    this.remaining = durationInSeconds;
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.intervalId = null;
    this.running = false;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.onTick(this.formatTime(this.remaining));

    this.intervalId = setInterval(() => {
      this.remaining--;
      if (this.remaining >= 0) {
        this.onTick(this.formatTime(this.remaining));
      } else {
        this.stop();
        this.onEnd();
      }
    }, 1000);
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.running = false;
    }
  }

  reset() {
    this.pause();
    this.remaining = this.initialDuration;
    this.onTick(this.formatTime(this.remaining));
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.running = false;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}
