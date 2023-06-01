renderMovieAbout();

async function renderMovieAbout() {
  const movie = await getMovie(id);
  const movieContainer = document.querySelector(".movies-container");
  const html = `<div class="movie-about">
    <div class="movie-header">           
        <span>Star Wars: ${movie.title}. Episode ${movie.episode_id}</span>
        <button class="add-favorites" data-id=${
          movie.id
        } onclick="addToFavorites(event)">Add to Favorites</button>
    </div>
    <img class="img-about" src="${getMovieData(movie).aboutImg}" alt="">
    <div class="movie-additional-info">
        <div class="release-creating-info">
            <p>Release date: <span>${movie.release_date}</span></p>
            <p>Rating IMDb: <span>${getMovieData(movie).rating}</span></p>
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
  changeBtnStyle();
  menuState();
}

function changeBtnStyle() {
  const favoriteBtn = document.querySelector(".add-favorites");
  favoriteItems.forEach((item) => {
    if (item.target === favoriteBtn.dataset.id) {
      favoriteBtn.classList.add("in-favorites");
      favoriteBtn.textContent = "Remove from Favorites";
    }
  });
}

async function renderMovieCharacters() {
  const loadMoreButton = document.querySelector("#loadMoreCharacters");
  const spinner = document.querySelector(".spinner");
  loadMoreButton.classList.add("hidden");
  spinner.classList.add("show");
  charactersAll = await getCharactersList();
  generateCharacters(charactersAll);
  spinner.classList.remove("show");
  loadMoreButton.classList.remove("hidden");
}

function generateCharacters(characters) {
  let count = 0;

  const charactersContainer = document.querySelector(".characters-container");
  for (let index = 0; index < characters.length; index++) {
    if (
      charactersContainer.childElementCount % 8 !== 0 &&
      charactersContainer.childElementCount !== 0
    ) {
      index = charactersContainer.childElementCount - 2;
    }
    if (count >= 8) {
      return;
    }
    count++;
    let element = document.createElement("a");
    element.classList.add("character-link");
    element.setAttribute(
      "href",
      `character.html?character=${characters[index].id}&film=${id}`
    );

    element.innerHTML = generateCharacter(characters[index]);
    charactersContainer.append(element);

    if (index >= characters.length - 1) {
      document.querySelector("#loadMoreCharacters").remove();
      return;
    }
  }
}

function generateCharacter(character) {
  return `<img src="${character.image}" class="character-cover" loading="lazy" alt="movie">
          <div class="character-title"><span>${character.name}</span></div>`;
}
