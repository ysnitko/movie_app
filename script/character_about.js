const characterID = searchParams.get("character") || 0;

renderCharacterAbout();

async function renderCharacterAbout() {
  const characterInfo = await getCharacterInfo(characterID);
  const movieContainer = document.querySelector(".movies-container");
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
  showCharactersFilmsLinks();
  toggleTheme();
}

async function showCharactersFilmsLinks() {
  const characterFilms = document.querySelector(".character-films-featuring");
  const characterInfo = await getCharacterInfo(characterID);
  let links = characterInfo.films;
  let movie = await getMovie(id);
  movie
    .filter((link) => links.includes(link.id.toString()))
    .map((link) => {
      const links = document.createElement("a");
      links.setAttribute("href", `index.html?id=${link.id}`);
      links.textContent = `${link.title}`;
      characterFilms.append(links);
    });
}