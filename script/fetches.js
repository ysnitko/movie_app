const searchParams = new URLSearchParams(location.search);
const id = searchParams.get('id') || 'all';
const characterID = searchParams.get('character') || 0;
let charactersAll = [];

renderAllMovies(id);

async function loadMovie(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function renderAllMovies(id) {
  const movieItems = document.querySelector('.movie-items');
  const movieList = await loadMovie(id);
  movieList
    .map((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('data-id', `${movie.id}`);
      linkMovie.setAttribute('href', `index.html?id=${movie.id}`);
      const movieCover = MOVIE_INFO.find((cover) => cover.id === movie.id);
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
    .forEach((movie) => movieItems.append(movie));
  OnSortingItems();
  toggleTheme();
  OnChangeLayout();
}

renderMovieAbout(id);

async function renderMovieAbout(id) {
  const movie = await loadMovie(id);
  const movieContainer = document.querySelector('.movies-container');
  const movieCover = MOVIE_INFO.find((cover) => cover.id === movie.id);
  const html = `<div class="movie-about">
  <div class="movie-header">           
      <span>Star Wars: ${movie.title}. Episode ${movie.episode_id}</span>
      <button class="add-favorites" data-id=${movie.id} onclick="addToFavorites(event)">Add to Favorites</button>
  </div>
  <img class="img-about" src="${movieCover.aboutImg}" alt="">
  <div class="movie-additional-info">
      <div class="release-creating-info">
          <p>Release date: <span>${movie.release_date}</span></p>
          <p>Rating IMDb: <span>${movieCover.rating}</span></p>
      </div>
      <div class="director-producer-info">
          <p>Directed by: <span>${movie.director}</span></p>
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
    <button id="loadMoreCharacters" onclick="renderMovieCharacters()"></button>
    </div>
  </div>
  </div>
`;
  movieContainer.innerHTML = html;
  renderMovieCharacters();
  toggleTheme();
}

async function loadCharacterInfo(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function getCharactersList() {
  const character = await loadCharacterInfo('all');
  const movie = await loadMovie(id);
  if (charactersAll.length === 0) {
    movie.characters.map((item) => {
      charactersAll.push(character[item - 1]);
    });
  }
  return charactersAll;
}

async function renderMovieCharacters() {
  const loadMoreButton = document.querySelector('#loadMoreCharacters');
  loadMoreButton.classList.remove('show');
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
  charactersAll = await getCharactersList();
  console.log(charactersAll);
  generateCharacters(charactersAll);
  spinner.classList.remove('show');
  loadMoreButton.classList.add('show');
}

function generateCharacters(characters) {
  // let count = 0;
  const charactersContainer = document.querySelector('.characters-container');
  for (let i = 0; i < characters.length; i++) {
    // if (
    //   charactersContainer.childElementCount % 7 !== 0 &&
    //   charactersContainer.childElementCount !== 0
    // ) {
    //   i = charactersContainer.childElementCount;
    // }
    // if (charactersContainer.childElementCount >= characters.length) {
    //   return;
    // }
    // if (count >= 7) {
    //   return;
    // }
    // count++;
    let item = document.createElement('a');
    item.classList.add('character-link');
    item.setAttribute('href', `index.html?character=${characters[i].id}`);
    item.innerHTML = generateCharacter(characters[i]);
    charactersContainer.append(item);
  }

  if (charactersContainer.childElementCount >= characters.length) {
    const loadMoreButton = document.querySelector('#loadMoreCharacters');
    loadMoreButton.remove();
  }
}

function generateCharacter(character) {
  return `<img src="${character.image}" class="character-cover" alt="movie">
          <div class="character-title"><span>${character.name}</span></div>`;
}

// async function renderMovieCharacters(startIndex, endIndex, itemsOnPage) {
//   const loadMoreButton = document.querySelector("#loadMoreCharacters");
//   const charactersContainer = document.querySelector(".characters-container");
//   let charactersList = await getCharactersList();
//   console.log(charactersList);
//   const spinner = document.querySelector(".spinner");
//   // spinner.classList.add("show");
//   loadMoreButton.classList.add("hidden");
//   charactersList
//     .map((character) => {
//       const characterLink = document.createElement("a");
//       characterLink.classList.add("character-link");
//       characterLink.setAttribute(
//         "href",
//         `index.html?character=${character.id}`
//       );
//       const html = `
//       <div>
//       <img src="${character.image}" class="character-cover" alt="movie">
//       </div>
//         <div class="character-title"><span>${character.name}</span></div>`;
//       characterLink.innerHTML = html;
//       return characterLink;
//     })
//     .slice(startIndex, endIndex)
//     .forEach((character) => charactersContainer.append(character));
//   spinner.classList.remove("show");
//   loadMoreButton.classList.remove("hidden");
//   if (currentPage > Math.ceil(charactersList.length / itemsOnPage)) {
//     loadMoreButton.classList.add("hidden");
//   }
// }

async function renderCharacterAbout(id) {
  const characterInfo = await loadCharacterInfo(id);
  console.log(characterInfo);
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
  showCharactersFilmsLinks(id);
  toggleTheme();
}

renderCharacterAbout(characterID);

async function showCharactersFilmsLinks(id) {
  const characterFilms = document.querySelector('.character-films-featuring');
  const characterInfo = await loadCharacterInfo(id);
  let links = characterInfo.films;
  let movie = await loadMovie('all');
  movie
    .filter((link) => links.includes(link.id.toString()))
    .map((link) => {
      const links = document.createElement('a');
      links.setAttribute('href', `index.html?id=${link.id}`);
      links.textContent = `${link.title}`;
      characterFilms.append(links);
    });
}
