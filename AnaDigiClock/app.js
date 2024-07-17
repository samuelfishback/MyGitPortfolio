function adjustFontSize(){
  let deviceSize = (window.innerWidth + window.innerHeight) / 2;
  document.documentElement.style.setProperty('--device-size', `${deviceSize}px`);
}

let globalTimes = {};

function grabGlobalTime(){
  let now = new Date();
  globalTimes.seconds = now.getSeconds();
  globalTimes.minutes = now.getMinutes();
  globalTimes.hours = now.getHours();
}

function updateHands(){
  let secondHand = document.getElementById('secondHand');
  let minuteHand = document.getElementById('minuteHand');
  let hourHand = document.getElementById('hourHand');
// each second is 6deg. offset of 90deg is set in css
  let secondsDegrees = globalTimes.seconds * 6; 
  let minutesDegrees = globalTimes.minutes * 6;
// hourHand moves by 6deg every 10min
// every hour is 30deg
// translate a 24hr time to a 12hr clock
  let hoursDegrees = (globalTimes.hours % 12 * 30) + (Math.floor(globalTimes.minutes / 10) * 6);
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function updateDigital(){
  let digitalSecond = document.getElementById('digitalSecond');
  let digitalMinute = document.getElementById('digitalMinute');
  let digitalHour = document.getElementById('digitalHour');
  digitalSecond.textContent = globalTimes.seconds < 10 ? '0' + globalTimes.seconds : globalTimes.seconds;
  digitalMinute.textContent = globalTimes.minutes < 10 ? '0' + globalTimes.minutes : globalTimes.minutes;
  digitalHour.textContent = globalTimes.hours;
}

window.onload = adjustFontSize;
window.addEventListener('resize', adjustFontSize);
setInterval(() => {
  grabGlobalTime();
  updateHands();
  updateDigital();
  }, 1000);
grabGlobalTime();
updateHands();
updateDigital();