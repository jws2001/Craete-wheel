import DateRun from './DateRun.js';
const dateContainers = document.querySelectorAll('.date-container');

const hourBox = dateContainers[0];
const minuteBox = dateContainers[1];
const secondBox = dateContainers[2];

const curDate = new Date();
let hour = curDate.getHours();
let minute = curDate.getMinutes();
let second = curDate.getSeconds();


const clHour = new DateRun(`${hour}`.padStart(2, '0'), `${hour === 23 ? '00' : (hour + 1)}`.padStart(2, '0'), hourBox);
const clMinute = new DateRun(`${minute}`.padStart(2, '0'), `${minute === 59 ? '00' : (minute + 1)}`.padStart(2, '0'), minuteBox);
const clSecond = new DateRun(`${second}`.padStart(2, '0'), `${second === 59 ? '00' : (second + 1)}`.padStart(2, '0'), secondBox);

function run() {
    requestAnimationFrame(run);
    const newCurDate = new Date();
    const newHour = newCurDate.getHours();
    const newMinute = newCurDate.getMinutes();
    const newSecond = newCurDate.getSeconds();

    if (newHour !== hour) {
        hour = newHour
        clHour.update(`${hour}`.padStart(2, '0'), `${hour === 23 ? '00' : (hour + 1)}`)
    }
    if (newMinute !== minute) {
        minute = newMinute;
        clMinute.update(`${minute}`.padStart(2, '0'), `${minute === 59 ? '00' : (minute + 1)}`)
    }

    if (newSecond !== second) {
        second = newSecond;
        clSecond.update(`${second}`.padStart(2, '0'), `${second === 59 ? '00' : (second + 1)}`.padStart(2, '0'));
    }
}

run();

window.addEventListener('visibilitychange', e => {
    if(document.visibilityState === 'visible'){
        run();
    }
})