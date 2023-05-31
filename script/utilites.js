const searchParams = new URLSearchParams(location.search);
let id = searchParams.get('id') || 'all';
let charactersAll = [];
let dataStorage = restore();
let favoriteItems = dataStorage.favorItem || [];
let state = restoreMenu();

async function getMovie(id) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/${id}.json`
  );
  const data = await response.json();
  return data;
}

async function getCharacterInfo(characterID) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${characterID}.json`
  );
  const data = await response.json();
  return data;
}

async function getCharactersList() {
  const character = await getCharacterInfo('all');
  const movie = await getMovie(id);
  if (charactersAll.length === 0) {
    movie.characters.map((item) => {
      charactersAll.push(character[item - 1]);
    });
  }
  return charactersAll;
}

function getMovieData(data) {
  return MOVIE_INFO.find((cover) => cover.id === data.id);
}

function favoriteCountShow() {
  const favoriteCount = document.querySelector('.favorites-items');
  favoriteCount.textContent = `${favoriteItems.length}`;
}

function store() {
  localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
}

function restore() {
  return JSON.parse(localStorage.getItem('dataStorage')) || {};
}

function storeMenu() {
  localStorage.setItem('state', state);
}

function restoreMenu() {
  return localStorage.getItem('state') || 'closed';
}
