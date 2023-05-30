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

function OnSortingItems() {
  const movieItems = document.querySelector(".movie-items");
  const movieList = Array.from(document.querySelectorAll(".movie-item"));
  if (select.selectedIndex === 0) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector(".movie-episode span")
        .textContent.split(" ")
        .slice(-1);
      const movieEpisodeB = b
        .querySelector(".movie-episode span")
        .textContent.split(" ")
        .slice(-1);
      return movieEpisodeA - movieEpisodeB;
    });
  }

  if (select.selectedIndex === 1) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector(".movie-episode span")
        .textContent.split(" ")
        .slice(-1);
      const movieEpisodeB = b
        .querySelector(".movie-episode span")
        .textContent.split(" ")
        .slice(-1);
      return movieEpisodeB - movieEpisodeA;
    });
  }

  if (select.selectedIndex === 2) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector(".movie-created span").textContent.split(" ").slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector(".movie-created span").textContent.split(" ").slice(-1)
      );
      return releaseDateA - releaseDateB;
    });
  }

  if (select.selectedIndex === 3) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector(".movie-created span").textContent.split(" ").slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector(".movie-created span").textContent.split(" ").slice(-1)
      );
      return releaseDateB - releaseDateA;
    });
  }
  store(select.selectedIndex);
  favoriteCountShow();
  movieList.forEach((movie) => {
    movieItems.append(movie);
  });
}

function OnChangeLayout() {
  const movieItem = document.querySelectorAll(".movie-item");
  const movieCrawl = document.querySelectorAll(".movie-crawl");
  const movieItems = document.querySelector(".movie-items");
  if (changeLayout.checked) {
    movieItems.classList.add("active-layout");
    movieItem.forEach((item) => {
      item.classList.add("active-item");
    });
    movieCrawl.forEach((item) => {
      item.style.display = "block";
    });
  } else {
    movieItems.classList.remove("active-layout");
    movieItem.forEach((item) => {
      item.classList.remove("active-item");
    });
    movieCrawl.forEach((item) => {
      item.style.display = "-webkit-box";
    });
  }
  store(changeLayout.checked);
  favoriteCountShow();
}

async function searchItems(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const movieItems = document.querySelector(".movie-items");
  const phrase = searchInput.value.toLowerCase();
  movieItems.innerHTML = "";
  const movieList = await getMovie(id);
  movieList
    .filter((movie) => {
      return (
        movie.title.toLowerCase().includes(phrase) ||
        movie.opening_crawl.toLowerCase().includes(phrase)
      );
    })
    .forEach((movie) => {
      const linkMovie = document.createElement("a");
      linkMovie.classList.add("movie-item");
      linkMovie.setAttribute("data-id", `${movie.id}`);
      linkMovie.setAttribute("href", `film.html?id=${movie.id}`);
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
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
  store(toggleThemes);
  favoriteCountShow();
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
