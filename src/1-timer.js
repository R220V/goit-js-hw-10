import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

iziToast.show({
  title: 'Hey',
  message: 'What would you like to add?',
});

co /
  // function convertMs(ms) {
  //   // Number of milliseconds per unit of time
  //   const second = 1000;
  //   const minute = second * 60;
  //   const hour = minute * 60;
  //   const day = hour * 24;

  //   // Remaining days
  //   const days = Math.floor(ms / day);
  //   // Remaining hours
  //   const hours = Math.floor((ms % day) / hour);
  //   // Remaining minutes
  //   const minutes = Math.floor(((ms % day) % hour) / minute);
  //   // Remaining seconds
  //   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  //   return { days, hours, minutes, seconds };
  // }

  flatpickr(refs.datetimePicker, options);
