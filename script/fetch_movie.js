// renderMovie(numMovie);
async function loadItem(numMovie) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/?movie=${numMovie}.json`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function renderMovie(numMovie) {
  const movieItems = document.querySelector('.movie-items');
  const promises = [loadItem(numMovie)];
  let movieList = await Promise.all(promises);
  movieList
    .map((movie) => {
      const linkMovie = document.createElement('div');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('data-id', `${movie.episode_id}`);
      const movieCover = MOVIE_COVER.find(
        (cover) => cover.id === movie.episode_id
      );
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
}
