let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = seconds => {
  // clearing any existing timers:
  clearInterval(countdown);

  const now = Date.now();
  // Time you wish for timer in ms:
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // not allow to go below 0sec:
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // displaying:
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
};

// 'Be back at':
const displayEndTime = timeStamp => {
  // get exact time in a format: < Date Sat Aug 03 2019 21:54:59 GMT+0100 >
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
};

const startTimer = e => {
  const seconds = parseInt(e.target.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', e => startTimer(e)));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // take direct value from input

  const mins = this.minutes.value;
  this.reset();
  timer(mins * 60);
});
