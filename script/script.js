const DEFAULT_TEXT = 'Login to your account';
const toggleThemes = document.querySelector('#checkbox');
toggleThemes.checked = dataStorage.toggle || false;

function openDialog(text = DEFAULT_TEXT) {
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

function onNavigationClick(event) {
  if (event.target.tagName !== 'SPAN') {
    return;
  }
  const title = event.target;
  const ul = title.nextElementSibling;
  if (ul) {
    ul.classList.toggle('hidden');
  }
  if (ul.classList.contains('hidden')) {
    state = 'closed';
    storeMenu();
  } else {
    state = 'open';
    storeMenu();
  }
}

function menuState() {
  const ul = document.querySelector('.main-navigation .favorites');
  if (state === 'open') {
    ul.classList.remove('hidden');
  } else if (state === 'closed') {
    ul.classList.add('hidden');
  }
  storeMenu();
}

menuState();

async function searchItems(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const movieItems = document.querySelector('.movie-items');
  const phrase = searchInput.value.toLowerCase();
  movieItems.innerHTML = '';
  const movieList = await getMovie(id);
  movieList
    .filter((movie) => {
      return (
        movie.title.toLowerCase().includes(phrase) ||
        movie.opening_crawl.toLowerCase().includes(phrase)
      );
    })
    .forEach((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('data-id', `${movie.id}`);
      linkMovie.setAttribute('href', `film.html?id=${movie.id}`);
      html = `
      <div class="img-container">
      <img src="${getMovieData(movie).src}" class="movie-cover" alt="movie"> 
      <span class="movie-rating">${getMovieData(movie).rating}</span> 
      </div>
      <div class="movie-info">
        <div class="movie-title"><span>${movie.title}</span></div>
        <div class="movie-crawl"><span>${movie.opening_crawl}</span></div>
        <div class="movie-created"><span>Release date: ${
          movie.release_date
        }</span></div>
        <div class="movie-episode"><span>Episode: ${
          movie.episode_id
        }</span></div>
      </div>`;
      linkMovie.innerHTML = html;
      movieItems.appendChild(linkMovie);
    });
}

function toggleTheme() {
  if (toggleThemes.checked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  dataStorage.toggle = toggleThemes.checked;
  store();
  favoriteCountShow();
}

toggleTheme();
