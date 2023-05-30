renderAllMovies();
async function renderAllMovies() {
  const movieItems = document.querySelector(".movie-items");
  const movieList = await getMovie(id);
  movieList
    .map((movie) => {
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
      return linkMovie;
    })
    .forEach((movie) => movieItems.append(movie));
  OnSortingItems();
  OnChangeLayout();
  toggleTheme();
}
