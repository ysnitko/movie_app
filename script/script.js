const select = document.querySelector('#sorting');
loadMore();

async function loadUser(num) {
  const response = await fetch(`https://swapi.dev/api/films/${num}`);
  const data = await response.json();
  // console.log(data);
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
  let movieList = await Promise.all(promises);
  movieList
    .map((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('href', '');
      linkMovie.setAttribute('data-id', `${movie.episode_id}`);
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
//

function OnSortingChange() {
  const movieItems = document.querySelector('.movie-items');
  const movieList = Array.from(document.querySelectorAll('.movie-item'));
  if (select.selectedIndex === 0) {
    movieList.sort((a, b) => {
      return a.dataset.id - b.dataset.id;
    });
  }

  if (select.selectedIndex === 1) {
    movieList.sort((a, b) => {
      const movieTitleA = a.querySelector('.movie-title').textContent;
      const movieTitleB = b.querySelector('.movie-title').textContent;
      if (movieTitleA < movieTitleB) {
        return -1;
      }
      if (movieTitleB > movieTitleA) {
        return 1;
      }
      return 0;
    });
  }

  if (select.selectedIndex === 2) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      console.log(
        a.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      return releaseDateA - releaseDateB;
    });
  }
  storeUser();
  movieItems.innerHTML = '';
  movieList.forEach((movie) => {
    movieItems.appendChild(movie);
  });
}

function storeUser() {
  localStorage.setItem(
    'dataStorage',
    JSON.stringify({
      select: select.selectedIndex,
    })
  );
}

function restoreUsers() {
  return JSON.parse(localStorage.getItem('dataStorage'));
}
