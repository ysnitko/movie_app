const releaseTimeContainer = document.querySelector('.release-time');
const flashingDot = document.querySelector('.flashing-dot');
const DEFAULT_TEXT = 'Login to your account';

function timeToNewEpisode() {
  let releaseDate = new Date(2024, 4, 16, 0, 0);
  let currentDate = new Date();
  let timeToRelease = (releaseDate - currentDate) / 1000;
  let days = Math.floor(timeToRelease / 86400);
  let hours = Math.floor((timeToRelease % 86400) / 3600);
  let minutes = Math.floor((timeToRelease % 3600) / 60);
  let seconds = Math.floor(timeToRelease % 60);

  releaseTimeContainer.innerHTML = `To release of the next episode remain: <span>${days}</span> days <span>${hours}</span> hours <span>${minutes}</span> minutes <span class="seconds-left">${seconds}</span> seconds`;

  if (flashingDot.style.visibility === 'hidden') {
    flashingDot.style.visibility = 'visible';
  } else {
    flashingDot.style.visibility = 'hidden';
  }

  if (timeToRelease <= 0) {
    clearInterval(timer);
    releaseTimeContainer.textContent = `before the next episode remain`;
  }
}

let timer = setInterval(timeToNewEpisode, 1000);
timeToNewEpisode();

function openPromtDialog(text = DEFAULT_TEXT) {
  let dialog = document.createElement('div');
  document.body.append(dialog);
  dialog.innerHTML = `
  <div class="dialog_container">
  <form id="form-authorization" action="https://fe.it-academy.by/TestForm.php"  method="get">
  <button class="x_button" onclick="closeDialog()">x</button>
    <p class="small_text">${text}</p>
    <input type="email" id="dialogInput" name="login" required placeholder="E-mail">
    <input type="password" name="password" placeholder="Password">
     <button class="confirm-button" type="submit">Login</button>
     <a href="#" class="forgot-password">Forgot your password?</a>
  </form>
</div>
  `;
}

function closeDialog() {
  let dialog = document.querySelector('.dialog_container');
  dialog.remove();
}

function onTreeNodeClick(event) {
  if (event.target.tagName !== 'SPAN') {
    return;
  }
  const title = event.target;
  const ul = title.nextElementSibling;
  if (ul) {
    ul.classList.toggle('hidden');
  }
}
