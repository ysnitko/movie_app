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
  let movieList = await promises;
  movieList
    .map((movie) => {
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
      return linkMovie;
    })
    .forEach((movie) => movieItems.appendChild(movie));
  OnSortingChange();
}

async function renderMovie(id) {
  const movie = await loadMovie(id);
  const movieContainer = document.querySelector('.movies-container');
  const movieCover = MOVIE_COVER.find((cover) => cover.id === movie.id);
  const html = `<div class="movie-about">
  <div class="movie-header">           
      <span>Star Wars: ${movie.title}. Episode ${movie.episode_id}</span>
      <a class="add-favorites"><img src="./img/bookmark-add.svg" alt=""><span>Add to favorites</span></a>
  </div>
  <img class="img-about" src="${movieCover.src_}" alt="">
  <div class="movie-additional-info">
      <div class="realese-reating-info">
          <span>Release date: ${movie.release_date}</span>
          <span>Rating IMDb: ${movieCover.rating}</span>
      </div>
      <div class="director-produser-info">
          <span>Directod by: ${movie.director}</span>
          <span>Produced by: ${movie.producer}</span>
      </div>
  </div>
  <div class="movie-story">
      <h3>Plot:</h3>
      <p>${movie.opening_crawl}</p>
  </div>
  <div class="characters">
    <span>Characters:</span>
    <div class="characters-container"></div>
  </div>
`;
  movieContainer.innerHTML = html;
  loadMovieCharacters(id);
}
renderMovie(id);

async function loadCharacter(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${id}.json`
  );
  const data = await response.json();
  // console.log(data);
  return data;
}
async function loadMovieCharacters(id) {
  const charactersContainer = document.querySelector('.characters-container');
  const promises = Array.from({ length: 87 }, (_, i) => loadCharacter(i + 1));
  let charactersList = await Promise.all(promises);
  console.log(charactersList);
  let movie = await loadMovie(id);
  charactersList
    .filter((character) => {
      console.log(character.films);
      return character.films.includes(`${movie.id}`);
    })
    .map((character) => {
      const characteritem = document.createElement('a');
      characteritem.classList.add('character-link');
      const html = `  
      <div>
      <img src="${character.image}" class="movie-cover" alt="movie"> 
      </div>
      <div class="character-info">
        <div class="character-title"><span>${character.name}</span></div>
        <div class="character-crawl"><span>${character.gender}</span></div>
        <div class="character-created"><span>Release date: ${character.species}</span></div>
      </div>`;
      characteritem.innerHTML = html;
      return characteritem;
    })
    .forEach((character) => charactersContainer.appendChild(character));
}

function OnSortingChange() {
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
