const select = document.querySelector('#sorting');
const toggleThemes = document.querySelector('#checkbox');
const changeLayout = document.querySelector('.layouts');

changeLayout.checked = restore().layoutChecked || false;
toggleThemes.checked = restore().themesChecked || false;
select.selectedIndex = restore().select || 0;

function OnSortingItems() {
  const movieItems = document.querySelector('.movie-items');
  const movieList = Array.from(document.querySelectorAll('.movie-item'));
  if (select.selectedIndex === 0) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      const movieEpisodeB = b
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      return movieEpisodeA - movieEpisodeB;
    });
  }

  if (select.selectedIndex === 1) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      const movieEpisodeB = b
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      return movieEpisodeB - movieEpisodeA;
    });
  }

  if (select.selectedIndex === 2) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      return releaseDateA - releaseDateB;
    });
  }

  if (select.selectedIndex === 3) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      return releaseDateB - releaseDateA;
    });
  }
  store();
  movieItems.innerHTML = '';
  movieList.forEach((movie) => {
    movieItems.appendChild(movie);
  });
}

function OnChangeLayout() {
  const movieItem = document.querySelectorAll('.movie-item');
  const movieCrawl = document.querySelectorAll('.movie-crawl');
  const movieItems = document.querySelector('.movie-items');
  if (changeLayout.checked) {
    movieItems.classList.add('active-layout');
    movieItem.forEach((item) => {
      item.classList.add('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = 'block';
    });
    store(changeLayout.checked);
  } else {
    movieItems.classList.remove('active-layout');
    movieItem.forEach((item) => {
      item.classList.remove('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = '-webkit-box';
    });
    store(changeLayout.checked);
  }
}

async function searchItems(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const movieItems = document.querySelector('.movie-items');
  const phrase = searchInput.value.toLowerCase();
  movieItems.innerHTML = '';
  const movieList = await loadMovie(id);
  console.log(movieList);
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
      linkMovie.setAttribute('href', `index.html?id=${movie.id}`);
      const movieCover = MOVIE_COVER.find((cover) => cover.id === movie.id);
      html = `
      <div class="img-container">
      <img src="${movieCover.src}" class="movie-cover" alt="movie"> 
      <span class="movie-rating">${movieCover.rating}</span> 
      </div>
      <div class="movie-info">
        <div class="movie-title"><span>${movie.title}</span></div>
        <div class="movie-crawl"><span>${movie.opening_crawl}</span></div>
        <div class="movie-created"><span>Release date: ${movie.release_date}</span></div>
        <div class="movie-episode"><span>Episode: ${movie.episode_id}</span></div>
      </div>`;
      linkMovie.innerHTML = html;
      movieItems.appendChild(linkMovie);
    });
}

function toggleTheme() {
  if (toggleThemes.checked) {
    document.body.classList.add('dark-theme');
    store(toggleThemes.checked);
  } else {
    document.body.classList.remove('dark-theme');
    store(toggleThemes.checked);
  }
}

function timeToNewEpisode() {
  let releaseDate = new Date(2024, 4, 16, 0, 0);
  let currentDate = new Date();
  let timeToRealese = (releaseDate - currentDate) / 1000;
  let days = Math.floor(timeToRealese / 86400);
  let hours = Math.floor((timeToRealese % 86400) / 3600);
  let minutes = Math.floor((timeToRealese % 3600) / 60);
  let seconds = Math.floor(timeToRealese % 60);
  const releaseTimeContainer = document.querySelector('.release-time');
  releaseTimeContainer.innerHTML = `To release of the next episode remain: <span>${days}</span> days <span>${hours}</span> hours <span>${minutes}</span> minutes <span class="seconds-left">${seconds}</span> seconds`;
  const flashingDot = document.querySelector('.flashing-dot');

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

function store() {
  localStorage.setItem(
    'dataStorage',
    JSON.stringify({
      select: select.selectedIndex,
      themesChecked: toggleThemes.checked,
      layoutChecked: changeLayout.checked,
    })
  );
}

function restore() {
  return JSON.parse(localStorage.getItem('dataStorage'));
}
