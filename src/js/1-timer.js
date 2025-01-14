import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let countdownInterval = null;

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      refs.startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        messageColor: 'Purple',
        color: 'red',
        position: 'bottomRight',
        message: 'Please choose a date in the future',
      });
    } else {
      userSelectedDate = selectedDate;
      refs.startButton.disabled = false;
    }
  },
};

flatpickr(refs.datetimePicker, options);

refs.startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  refs.startButton.disabled = true;
  refs.datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0);
      iziToast.success({
        title: 'Done',
        messageColor: 'green',
        messageSize: '16',
        position: 'topRight',
        message: 'Countdown completed!',
      });
      refs.datetimePicker.disabled = false;
      return;
    }

    updateTimerDisplay(timeLeft);
  }, 1000);
});

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
