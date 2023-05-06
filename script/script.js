loadMore();
async function loadUser(count) {
  const response = await fetch(`https://swapi.dev/api/films/${count}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function loadMore() {
  const movieItems = document.querySelector('.movie-items');
  const promises = [
    loadUser(1),
    loadUser(2),
    loadUser(3),
    loadUser(4),
    loadUser(5),
    loadUser(6),
  ];
  console.log(promises);
  let movieList = await Promise.all(promises);
  movieList
    .map((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('href', '');
      const movieCover = MOVIE_COVER.find(
        (cover) => cover.id === movie.episode_id
      );
      html = `
      <img src="${movieCover.src}" class="movie-cover" alt="movie">
      <div class="movie-info">
        <div class="movie-title"><span>${movie.title}</span></div>
        <div class="movie-created"><span>Release date: ${movie.release_date}</span></div>
        <div class="movie-episode"><span>Episode: ${movie.episode_id}</span></div>
      </div>`;
      linkMovie.innerHTML = html;
      return linkMovie;
    })
    .forEach((movie) => movieItems.appendChild(movie));
}

// function storeUser() {
//   localStorage.setItem('userList', JSON.stringify(userList));
// }

// function restoreUsers() {
//   return JSON.parse(localStorage.getItem('userList'));
// }
