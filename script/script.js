const select = document.querySelector('#sorting');
const toggleLayout = document.querySelector('.action-toggle-layout');
isChecked = restore().isChecked || false;
select.selectedIndex = restore().select || 0;

function OnSortingItems() {
  const movieItems = document.querySelector('.movie-items');
  const movieList = Array.from(document.querySelectorAll('.movie-item'));
  if (select.selectedIndex === 0) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      const movieEpisodeB = b
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      return movieEpisodeA - movieEpisodeB;
    });
  }

  if (select.selectedIndex === 1) {
    movieList.sort((a, b) => {
      const movieEpisodeA = a
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      const movieEpisodeB = b
        .querySelector('.movie-episode span')
        .textContent.split(' ')
        .slice(-1);
      return movieEpisodeB - movieEpisodeA;
    });
  }

  if (select.selectedIndex === 2) {
    movieList.sort((a, b) => {
      const movieTitleA = a.querySelector('.movie-title span').textContent;
      const movieTitleB = b.querySelector('.movie-title span').textContent;
      if (movieTitleB > movieTitleA) {
        return -1;
      }
    });
  }

  if (select.selectedIndex === 3) {
    movieList.sort((a, b) => {
      const movieTitleA = a.querySelector('.movie-title span').textContent;
      const movieTitleB = b.querySelector('.movie-title span').textContent;
      if (movieTitleA > movieTitleB) {
        return -1;
      }
    });
  }

  if (select.selectedIndex === 4) {
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

  if (select.selectedIndex === 5) {
    movieList.sort((a, b) => {
      const releaseDateA = new Date(
        a.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      const releaseDateB = new Date(
        b.querySelector('.movie-created span').textContent.split(' ').slice(-1)
      );
      return releaseDateB - releaseDateA;
    });
  }
  store();
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

async function searchItems(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const movieItems = document.querySelector('.movie-items');
  const phrase = searchInput.value.toLowerCase();
  movieItems.innerHTML = '';
  const movieList = await loadMovie(id);
  movieList
    .filter((movie) => {
      return movie.title.toLowerCase().includes(phrase);
    })
    .forEach((movie) => {
      const linkMovie = document.createElement('a');
      linkMovie.classList.add('movie-item');
      linkMovie.setAttribute('data-id', `${movie.id}`);
      linkMovie.setAttribute('href', `index.html?id=${movie.id}`);
      const movieCover = MOVIE_COVER.find((cover) => cover.id === movie.id);
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
      movieItems.appendChild(linkMovie);
    });
}

function toggleTheme() {
  const toggleTheme = document.querySelector('#checkbox');
  isChecked = toggleTheme.checked;
  if (isChecked) {
    document.body.classList.add('dark-theme');
    store('dark-theme', isChecked);
  } else {
    document.body.classList.remove('dark-theme');
    store('light-theme', isChecked);
  }
  store(isChecked);
}

function store(isChecked) {
  localStorage.setItem(
    'dataStorage',
    JSON.stringify({
      select: select.selectedIndex,
      isChecked: isChecked,
    })
  );
}

function restore() {
  return JSON.parse(localStorage.getItem('dataStorage'));
}
