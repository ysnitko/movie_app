const select = document.querySelector("#sorting");
const toggleThemes = document.querySelector("#checkbox");
const changeLayout = document.querySelector(".layouts");
const searchParams = new URLSearchParams(location.search);
let id = searchParams.get("id") || "all";
const characterID = searchParams.get("character") || 0;

toggleThemes.checked = restore().themes || false;
select.selectedIndex = restore().selected || 0;
changeLayout.checked = restore().layout || false;
let favoriteItems = restore().favoritesItem || [];
let charactersAll = [];

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
  const character = await getCharacterInfo("all");
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

function store(favoriteItems) {
  localStorage.setItem(
    "dataStorage",
    JSON.stringify({
      selected: select.selectedIndex,
      themes: toggleThemes.checked,
      layout: changeLayout.checked,
      favoritesItem: Array.from(favoriteItems),
    })
  );
}

function restore() {
  return JSON.parse(localStorage.getItem("dataStorage")) || [];
}
