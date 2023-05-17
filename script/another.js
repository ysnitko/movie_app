const releaseTimeContainer = document.querySelector('.release-time');
const flashingDot = document.querySelector('.flashing-dot');

function timeToNewEpisode() {
  let releaseDate = new Date(2024, 4, 16, 0, 0);
  let currentDate = new Date();
  let timeToRealese = (releaseDate - currentDate) / 1000;
  let days = Math.floor(timeToRealese / 86400);
  let hours = Math.floor((timeToRealese % 86400) / 3600);
  let minutes = Math.floor((timeToRealese % 3600) / 60);
  let seconds = Math.floor(timeToRealese % 60);

  releaseTimeContainer.innerHTML = `To release of the next episode remain: <span>${days}</span> days <span>${hours}</span> hours <span>${minutes}</span> minutes <span class="seconds-left">${seconds}</span> seconds`;

  if (flashingDot.style.visibility === 'hidden') {
    flashingDot.style.visibility = 'visible';
  } else {
    flashingDot.style.visibility = 'hidden';
  }

  if (timeToRealese <= 0) {
    clearInterval(timer);
    releaseTimeContainer.textContent = `before the next episode remain`;
  }
}

let timer = setInterval(timeToNewEpisode, 1000);
timeToNewEpisode();
