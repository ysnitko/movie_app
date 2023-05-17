const searchParams = new URLSearchParams(location.search);
const id = searchParams.get('id') || 'all';
const characterID = searchParams.get('character');

loadAllMovies(id);

async function loadMovie(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function loadAllMovies(id) {
  const movieItems = document.querySelector('.movie-items');
  const promises = loadMovie(id);
  let movieList = await Promise.resolve(promises);
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
  OnSortingItems();
  toggleTheme();
  OnChangeLayout();
}

async function renderMovieAbout(id) {
  const movie = await loadMovie(id);
  const movieContainer = document.querySelector('.movies-container');
  const movieCover = MOVIE_COVER.find((cover) => cover.id === movie.id);
  const html = `<div class="movie-about">
  <div class="movie-header">           
      <span>Star Wars: ${movie.title}. Episode ${movie.episode_id}</span>
      <a class="add-favorites"><img src="./img/bookmark-add.svg" alt=""><span>Add to favorites</span></a>
  </div>
  <img class="img-about" src="${movieCover.src_about}" alt="">
  <div class="movie-additional-info">
      <div class="realese-reating-info">
          <p>Release date: <span>${movie.release_date}</span></p>
          <p>Rating IMDb: <span>${movieCover.rating}</span></p>
      </div>
      <div class="director-produser-info">
          <p>Directod by: <span>${movie.director}</span></p>
          <p>Produced by: <span>${movie.producer}</span></p>
      </div>
  </div>
  <div class="movie-story">
      <h3>Plot:</h3>
      <p>${movie.opening_crawl}</p>
  </div>
  <div class="characters">
    <span>Characters:</span>
    <div class="characters-container">
    <div class="lds-ring spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    
    </div>
  </div>
  
  </div>
  <button id="loadMoreCharacters" onclick="loadMovieCharacters()">load more</button>
`;
  movieContainer.innerHTML = html;
  loadMovieCharacters();
  toggleTheme();
}

renderMovieAbout(id);

async function loadCharacter(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${id}.json`
  );
  const data = await response.json();
  return data;
}

const itemsPerPage = 7;
let currentPage = 1;
async function loadMovieCharacters() {
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = currentPage * itemsPerPage;
  const charactersContainer = document.querySelector('.characters-container');
  const promises = Array.from({ length: 87 }, (_, i) => loadCharacter(i + 1));
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
  let charactersList = await Promise.all(promises);
  let movie = await loadMovie(id);
  charactersList
    .filter((character) => {
      return character.films.includes(`${movie.id}`);
    })
    .map((character) => {
      const characterLink = document.createElement('a');
      characterLink.classList.add('character-link');
      characterLink.setAttribute(
        'href',
        `index.html?character=${character.id}`
      );
      const html = `  
      <div>
      <img src="${character.image}" class="character-cover" alt="movie"> 
      </div>
        <div class="character-title"><span>${character.name}</span></div>`;
      characterLink.innerHTML = html;
      return characterLink;
    })
    .slice(startIndex, endIndex)
    .forEach((character) => charactersContainer.appendChild(character));
  spinner.classList.remove('show');
  currentPage++;
}

async function loadCharacterInfo(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function renderCharacterAbout(id) {
  const characterInfo = await loadCharacterInfo(id);
  const movieContainer = document.querySelector('.movies-container');
  const html = `<div class="character-about"> 
                  <img class="character-image" src="${characterInfo.image}" alt="">
                  <div class="character-description">
                    <p class="character-name">Name: <span>${characterInfo.name}</span></p>
                    <p class="character-birth">Birth year: <span>${characterInfo.birth_year}</span></p>
                    <p class="character-gender">Gender: <span>${characterInfo.gender}</span></p>
                    <p class="character-species">Species: <span>${characterInfo.species}</span></p>
                    <p class="character-skin_color">Skin color: <span>${characterInfo.skin_color}</span></p>
                    <p class="character-height">Height: <span>${characterInfo.height}</span></p>
                    <p class="character-mass">Mass: <span>${characterInfo.mass}</span></p>
                     <div class="character-films">
                      <span>Films featuring:</span>
                      <div class="character-films-featuring">
                      </div>
                  </div>
                  <p class="character-wiki">Wiki: <a href="${characterInfo.wiki}" target="_blank">${characterInfo.wiki}</a></p>
                </div>
                </div>`;
  movieContainer.innerHTML = html;
  charactersFilms(id);
  toggleTheme();
}

renderCharacterAbout(characterID);

async function charactersFilms(id) {
  const characterFilms = document.querySelector('.character-films-featuring');
  const characterInfo = await loadCharacterInfo(id);
  let links = characterInfo.films;
  let movie = await loadMovie('all');
  movie
    .filter((link) => links.includes(link.id.toString()))
    .map((link) => {
      const links = document.createElement('a');
      links.setAttribute('href', `index.html?id=${link.id}`);
      links.textContent = `${link.title} \n`;
      characterFilms.append(links);
    });
}
