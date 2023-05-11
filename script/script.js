const select = document.querySelector('#sorting');
const toggleLayout = document.querySelector('.action-toggle-layout');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') || 'all';

loadMore(id);

async function loadMovie(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function loadMore(id) {
  const movieItems = document.querySelector('.movie-items');
  const promises = loadMovie(id);
  let movieList = await Promise.resolve(promises);
  movieList
    .map((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('data-id', `${movie.id}`);
      linkMovie.setAttribute('href', `index.html?id=${movie.id}`);
      // linkMovie.setAttribute('target', `_blank`);
      const movieCover = MOVIE_COVER.find((cover) => cover.id === movie.id);
      html = `
      <div class="img-container">
      <img src="${movieCover.src}" class="movie-cover" alt="movie"> 
      <span class="movie-rating">${movieCover.rating}</span> 
      <button class="add-favorites"></button>
      </div>
      <div class="movie-info">
        <div class="movie-title"><span>${movie.title}</span></div>
        <div class="movie-crawl"><span>${movie.opening_crawl}</span></div>
        <div class="movie-created"><span>Release date: ${movie.release_date}</span></div>
        <div class="movie-episode"><span>Episode: ${movie.episode_id}</span></div>
      </div>`;
      linkMovie.innerHTML = html;
      return linkMovie;
    })
    .forEach((movie) => movieItems.appendChild(movie));
  OnSortingChange();
}

async function renderMovie(id) {
  const movie = await loadMovie(id);
  const movieContainer = document.querySelector('.movies-container');
  const linkMovie = document.createElement('div');

  linkMovie.classList.add('movie-item');
  const movieCover = MOVIE_COVER.find((cover) => cover.id === movie.id);

  const html = `
<div class="movie-items">
<div class="img-container"> 
<img src="${movieCover.src}" class="movie-cover" alt="movie">  
<span class="movie-rating">${movieCover.rating}</span>  
</div> 
<div class="movie-info"> 
<div class="movie-title"><span>${movie.title}</span></div> 
<div class="movie-crawl"><span>${movie.opening_crawl}</span></div> 
<div class="movie-created"><span>Release date: ${movie.release_date}</span></div> 
<div class="movie-episode"><span>Episode: ${movie.episode_id}</span></div> 
</div>
</div>`;
  movieContainer.innerHTML = html;
}
renderMovie(id);

function OnSortingChange() {
  const movieItems = document.querySelector('.movie-items');
  const movieList = Array.from(document.querySelectorAll('.movie-item'));
  if (select.selectedIndex === 0) {
    movieList.sort((a, b) => {
      return a.dataset.id - b.dataset.id;
    });
  }
  if (select.selectedIndex === 1) {
    movieList.sort((a, b) => {
      return b.dataset.id - a.dataset.id;
    });
  }
  if (select.selectedIndex === 2) {
    movieList.sort((a, b) => {
      const movieTitleA = a.querySelector('.movie-title span').textContent;
      const movieTitleB = b.querySelector('.movie-title span').textContent;
      if (movieTitleB > movieTitleA) {
        return -1;
      }
    });
  }
  if (select.selectedIndex === 3) {
    movieList.sort((a, b) => {
      const movieTitleA = a.querySelector('.movie-title span').textContent;
      const movieTitleB = b.querySelector('.movie-title span').textContent;
      if (movieTitleA > movieTitleB) {
        return -1;
      }
    });
  }
  if (select.selectedIndex === 4) {
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
  if (select.selectedIndex === 5) {
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
  movieItems.innerHTML = '';
  movieList.forEach((movie) => {
    movieItems.appendChild(movie);
  });
}

// change layout
function OnChangeLayout(event) {
  let target = event.target;
  const movieItems = document.querySelector('.movie-items');
  const movieItem = document.querySelectorAll('.movie-item');
  const movieCrawl = document.querySelectorAll('.movie-crawl');
  if (target.classList.contains('toggle-tile')) {
    movieItems.classList.add('active-layout');
    movieItem.forEach((item) => {
      item.classList.add('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = 'block';
    });
  } else if (target.classList.contains('toggle-rows')) {
    movieItems.classList.remove('active-layout');
    movieItem.forEach((item) => {
      item.classList.remove('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = '-webkit-box';
    });
  }
}

toggleLayout.addEventListener('click', OnChangeLayout);

// search
async function searchItems(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const phrase = searchInput.value.toLowerCase().trim();
  const movieItems = document.querySelector('.movie-items');
  movieItems.innerHTML = '';
  const movieList = await loadMovie();
  movieList
    .filter((movie) => {
      return movie.title.toLowerCase().includes(phrase);
    })
    .forEach((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('href', `${renderMovie(movie.episode_id)}`);
      linkMovie.setAttribute('data-id', `${movie.episode_id}`);
      const movieCover = MOVIE_COVER.find(
        (cover) => cover.id === movie.episode_id
      );
      html = `
      <div class="img-container">
      <img src="${movieCover.src}" class="movie-cover" alt="movie"> 
      <span class="movie-rating">${movieCover.rating}</span> 
      <button class="add-favorites"></button>
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

function storeUser() {
  localStorage.setItem(
    'dataStorage',
    JSON.stringify({
      select: select.selectedIndex,
    })
  );
}

function restoreUsers() {
  return JSON.parse(localStorage.getItem('dataStorage'));
}

function toggleTheme() {
  const link = document.querySelector('link');
  const checked = document.querySelector('#checkbox');
  if (checked.checked) {
    link.setAttribute('href', './style/dark-theme.css');
  } else {
    link.setAttribute('href', './style/style.css');
  }
}
