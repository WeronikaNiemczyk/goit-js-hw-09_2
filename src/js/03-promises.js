import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const onSubmit = event => {
  event.preventDefault();
  let delayValue = parseInt(delayInput.value);
  let stepValue = parseInt(stepInput.value);
  let amountValue = parseInt(amountInput.value);
  for (let position = 1; position <= amountValue; position++) {
    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }
  form.reset();
};
form.addEventListener('submit', onSubmit);
