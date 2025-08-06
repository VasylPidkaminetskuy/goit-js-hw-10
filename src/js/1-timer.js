import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
  timerInput: document.querySelector('#datetime-picker'),
};
let userSelectedDate = null;

if (!userSelectedDate) {
  refs.startBtn.disabled = true;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
      return;
    }

    if (selectedDates[0] > new Date()) {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  initTime: null,

  start() {
    if (this.intervalId) {
      return;
    }

    this.initTime = Date.now();
    if (!this.intervalId) {
      refs.startBtn.disabled = true;
      refs.timerInput.disabled = true;
    }
    console.log('start timer');
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  },

  tick() {
    let userDate = new Date(userSelectedDate).getTime();
    let currenttime = Date.now();
    let delta = userDate - currenttime;

    if (delta <= 0) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      refs.timerInput.disabled = false;
      refs.startBtn.disabled = false;

      refs.timerDays.textContent = '00';
      refs.timerHours.textContent = '00';
      refs.timerMinutes.textContent = '00';
      refs.timerSeconds.textContent = '00';
      return;
    }

    const transferTime = convertMs(delta);

    refs.timerDays.textContent = String(transferTime.days).padStart(2, '0');
    refs.timerHours.textContent = String(transferTime.hours).padStart(2, '0');
    refs.timerMinutes.textContent = String(transferTime.minutes).padStart(
      2,
      '0'
    );
    refs.timerSeconds.textContent = String(transferTime.seconds).padStart(
      2,
      '0'
    );
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

function convertMs(ms) {
  if (ms < 0) ms = 0;
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
