import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const flatpickrInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const timerItem = document.querySelector('.timer');

startBtn.disabled = true;

function convertMs(ms) {
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

const fp = flatpickr(flatpickrInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0].getTime();
    let nowDate = new Date().getTime();
    let stopCounter = selectedDate - nowDate;
    // console.log(selectedDates[0]);

    if (selectedDate <= nowDate) {
      startBtn.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;

      const startBtnClick = () => {
        startBtn.disabled = true;
        flatpickrInput.disabled = true;
        const addLeadingZero = value => value.toString().padStart(2, '0');

        let timerId = setInterval(() => {
          stopCounter -= 1000;

          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;

          const days = Math.floor(stopCounter / day);
          const hours = Math.floor((stopCounter % day) / hour);
          const minutes = Math.floor(((stopCounter % day) % hour) / minute);
          const seconds = Math.floor(
            (((stopCounter % day) % hour) % minute) / second
          );

          dataDays.textContent = addLeadingZero(days);
          dataHours.textContent = addLeadingZero(hours);
          dataMinutes.textContent = addLeadingZero(minutes);
          dataSeconds.textContent = addLeadingZero(seconds);

          if (stopCounter < 1000) {
            clearInterval(timerId);
            dataSeconds.textContent = 0;
          }
        }, 1000);
      };
      startBtn.addEventListener('click', startBtnClick);
    }
  },
});
timerItem.style.display = 'flex';
timerItem.style.justifyContent = 'space-evenly';
timerItem.style.width = '40%';
timerItem.style.marginLeft = '18px';
