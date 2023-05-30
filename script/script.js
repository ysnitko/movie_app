const releaseTimeContainer = document.querySelector(".release-time");
const flashingDot = document.querySelector(".flashing-dot");
const DEFAULT_TEXT = "Login to your account";

function timeToNewEpisode() {
  let releaseDate = new Date(2024, 4, 16, 0, 0);
  let currentDate = new Date();
  let timeToRelease = (releaseDate - currentDate) / 1000;
  let days = Math.floor(timeToRelease / 86400);
  let hours = Math.floor((timeToRelease % 86400) / 3600);
  let minutes = Math.floor((timeToRelease % 3600) / 60);
  let seconds = Math.floor(timeToRelease % 60);

  releaseTimeContainer.innerHTML = `To release of the next episode remain: <span>${days}</span> days <span>${hours}</span> hours <span>${minutes}</span> minutes <span class="seconds-left">${seconds}</span> seconds`;

  if (flashingDot.style.visibility === "hidden") {
    flashingDot.style.visibility = "visible";
  } else {
    flashingDot.style.visibility = "hidden";
  }

  if (timeToRelease <= 0) {
    clearInterval(timer);
    releaseTimeContainer.textContent = `before the next episode remain`;
  }
}

let timer = setInterval(timeToNewEpisode, 1000);
timeToNewEpisode();

function openDialog(text = DEFAULT_TEXT) {
  let dialog = document.createElement("div");
  document.body.append(dialog);
  dialog.innerHTML = `
  <div class="dialog_container">
  <form id="form-authorization" action="https://fe.it-academy.by/TestForm.php"  method="get">
  <button class="x_button" onclick="closeDialog()">x</button>
    <p class="small_text">${text}</p>
    <input type="email" id="dialogInput" name="login" required placeholder="E-mail">
    <input type="password" name="password" placeholder="Password">
     <button class="confirm-button" type="submit">Login</button>
     <a href="#" class="forgot-password">Forgot your password?</a>
  </form>
</div>
  `;
}

function closeDialog() {
  let dialog = document.querySelector(".dialog_container");
  dialog.remove();
}

function onNavigationClick(event) {
  if (event.target.tagName !== "SPAN") {
    return;
  }
  const title = event.target;
  const ul = title.nextElementSibling;
  if (ul) {
    ul.classList.toggle("hidden");
  }
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
