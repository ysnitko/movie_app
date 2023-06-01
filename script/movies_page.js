const select = document.querySelector('#sorting');
const changeLayout = document.querySelector('.layouts');
changeLayout.checked = dataStorage.layout || false;
select.selectedIndex = dataStorage.selected || 0;

renderAllMovies();

async function renderAllMovies() {
  const movieItems = document.querySelector('.movie-items');
  const movieList = await getMovie(id);
  const elements = document.querySelectorAll('*');
  movieList
    .map((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('data-id', `${movie.id}`);
      linkMovie.setAttribute('href', `film.html?id=${movie.id}`);
      html = `
        <div class="img-container skeleton">
        <img src="${getMovieData(movie).src}" class="movie-cover" alt="">  
        </div>
        <div class="movie-info">
          <div class="movie-title skeleton"><span>${movie.title}</span></div>
          <div class="movie-crawl skeleton"><span>${
            movie.opening_crawl
          }</span></div>
          <div><span class="movie-created skeleton">Release date: ${
            movie.release_date
          }</span></div>
          <div class="movie-episode skeleton"><span class="episode-num">Episode: ${
            movie.episode_id
          }</span></div>
        </div>`;
      linkMovie.innerHTML = html;
      return linkMovie;
    })
    .forEach((movie) => {
      movieItems.append(movie);
    });
  OnSortingItems();
  OnChangeLayout();
  toggleTheme();
  menuState();
}

function OnSortingItems() {
  const movieItems = document.querySelector('.movie-items');
  const movieList = Array.from(document.querySelectorAll('.movie-item'));
  if (select.selectedIndex === 0) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector('.episode-num')
        .textContent.split(' ')
        .slice(-1);
      const movieEpisodeB = b
        .querySelector('.episode-num')
        .textContent.split(' ')
        .slice(-1);
      return movieEpisodeA - movieEpisodeB;
    });
  }

  if (select.selectedIndex === 1) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector('.episode-num')
        .textContent.split(' ')
        .slice(-1);
      const movieEpisodeB = b
        .querySelector('.episode-num')
        .textContent.split(' ')
        .slice(-1);
      return movieEpisodeB - movieEpisodeA;
    });
  }

  if (select.selectedIndex === 2) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector('.movie-created').textContent.split(' ').slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector('.movie-created').textContent.split(' ').slice(-1)
      );
      return releaseDateA - releaseDateB;
    });
  }

  if (select.selectedIndex === 3) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector('.movie-created').textContent.split(' ').slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector('.movie-created').textContent.split(' ').slice(-1)
      );
      return releaseDateB - releaseDateA;
    });
  }
  store(select.selectedIndex);
  dataStorage.selected = select.selectedIndex;
  store();
  favoriteCountShow();
  movieList.forEach((movie) => {
    movieItems.append(movie);
  });
}

function timeToNewEpisode() {
  const releaseTimeContainer = document.querySelector('.release-time');
  const flashingDot = document.querySelector('.flashing-dot');
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
  } else {
    movieItems.classList.remove('active-layout');
    movieItem.forEach((item) => {
      item.classList.remove('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = '-webkit-box';
    });
  }
  dataStorage.layout = changeLayout.checked;
  store();
  favoriteCountShow();
}
