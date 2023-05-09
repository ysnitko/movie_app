const select = document.querySelector('#sorting');
const toggleLayout = document.querySelector('.action-toggle-layout');
loadMore();

async function loadUser() {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/all.json`
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

async function loadMore() {
  const movieItems = document.querySelector('.movie-items');
  const promises = loadUser();
  let movieList = await Promise.resolve(promises);
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
      <div class="img-container">
      <img src="${movieCover.src}" class="movie-cover" alt="movie"> 
      <span class="movie-rating">${movieCover.rating}<span> 
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

// change layout
function OnChangeLayout(event) {
  let target = event.target;
  const movieItems = document.querySelector('.movie-items');
  const movieItem = document.querySelectorAll('.movie-item');
  const movieCrawl = document.querySelectorAll('.movie-crawl');
  if (target.classList.contains('toggle-tile')) {
    movieItems.classList.add('active-layout');
    movieItem.forEach((item) => {
      item.classList.add('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = 'block';
    });
  } else if (target.classList.contains('toggle-rows')) {
    movieItems.classList.remove('active-layout');
    movieItem.forEach((item) => {
      item.classList.remove('active-item');
    });
    movieCrawl.forEach((item) => {
      item.style.display = '-webkit-box';
    });
  }
}

toggleLayout.addEventListener('click', OnChangeLayout);

// search

async function searchItems() {
  const searchInput = document.querySelector('#search-input');
  const phrase = searchInput.value.toLowerCase().trim();
  console.log(phrase);
  const movieItems = document.querySelector('.movie-items');
  movieItems.innerHTML = '';
  const movieList = await loadUser();
  movieList
    .filter((movie) => {
      return movie.title.toLowerCase().includes(phrase);
    })
    .forEach((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('href', '');
      linkMovie.setAttribute('data-id', `${movie.episode_id}`);
      const movieCover = MOVIE_COVER.find(
        (cover) => cover.id === movie.episode_id
      );
      html = `
      <div class="img-container">
      <img src="${movieCover.src}" class="movie-cover" alt="movie"> 
      </div>
      <div class="movie-info"> 
        <div class="movie-title"><span>${movie.title}</span></div> 
        <div class="movie-crawl"><span>${movie.opening_crawl}</span></div> 
        <div class="movie-created"><span>Release date: ${movie.release_date}</span></div> 
        <div class="movie-episode"><span>Episode: ${movie.episode_id}</span></div> 
      </div>`;
      linkMovie.innerHTML = html;
      movieItems.appendChild(linkMovie);
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
