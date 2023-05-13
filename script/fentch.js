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
    <div class="characters-container"></div>
  </div>
`;
  movieContainer.innerHTML = html;
  loadMovieCharacters(id);
}

renderMovieAbout(id);

async function loadCharacter(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function loadMovieCharacters(id) {
  const charactersContainer = document.querySelector('.characters-container');
  const promises = Array.from({ length: 87 }, (_, i) => loadCharacter(i + 1));
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
      <img src="${character.image}" class="movie-cover" alt="movie"> 
      </div>
      <div class="character-info">
        <div class="character-title"><span>name: ${character.name}</span></div>
        <div class="character-created"><span>species: ${character.species}</span></div>
        <div class="character-created"><span>homeworld: ${character.homeworld}</span></div>
      </div>`;
      characterLink.innerHTML = html;
      return characterLink;
    })
    .forEach((character) => charactersContainer.appendChild(character));
  console.log(charactersList);
}

async function loadCharacterInfo(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${id}.json`
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

async function renderCharacterAbout(id) {
  const characterInfo = await loadCharacterInfo(id);
  const movieContainer = document.querySelector('.movies-container');
  const html = `<div class="movie-about"> 
    <div>            
      <span>Star Wars: ${characterInfo.name}. Episode ${characterInfo.eye_color}</span> 
      <img class="img-about" src="${characterInfo.image}" alt=""> 
    </div> 
    <div class="character-info">
      <div class="character-birth"><span>Birth year: ${characterInfo.birth_year}</span></div> 
      <div class="character-gender"><span>Gender: ${characterInfo.gender}</span></div> 
      <div class="character-height"><span>Height: ${characterInfo.height}</span></div> 
      <div class="character-created"><span>Homeworld: ${characterInfo.homeworld}</span></div> 
    </div>
  </div>`;
  movieContainer.innerHTML = html;
}

renderCharacterAbout(characterID);
