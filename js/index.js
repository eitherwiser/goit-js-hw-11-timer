class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }
  getRefs() {
    const container = document.querySelector(this.selector);
    const daysRef = container.querySelector('[data-value="days"]');
    const hoursRef = container.querySelector('[data-value="hours"]');
    const minutesRef = container.querySelector('[data-value="mins"]');
    const secsRef = container.querySelector('[data-value="secs"]');
    return { daysRef, hoursRef, minutesRef, secsRef, container };
  }
  updateTimer({ daysRef, hoursRef, minutesRef, secsRef, container }) {
    const time = this.targetDate - Date.now();
    if (time < 1000) {
      this.stopTimer();
      container.innerHTML = '<h1>Время вышло</h1>';
      return;
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    daysRef.textContent = days.padStart(2, '0');
    hoursRef.textContent = hours < 10 ? `0${hours}` : hours;
    minutesRef.textContent = mins;
    secsRef.textContent = secs;
  }
  startTimer() {
    this.intervalId = setInterval(() => this.updateTimer(this.getRefs()), 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
  }
}
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000)),
});

timer.startTimer();