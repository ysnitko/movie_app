const favorites = document.querySelector('.favorites');

async function addToFavorites(event) {
  let target = event.target;
  let link = await renderFavorites(target.dataset.id);
  let isFavorite = favoriteItems.some(
    (item) => item.target === target.dataset.id
  );
  if (!isFavorite) {
    target.classList.add('in-favorites');
    target.textContent = 'Remove from Favorites';
    favoriteItems.push({
      target: target.dataset.id,
    });
    dataStorage.favorItem = favoriteItems;
    store();
    favorites.append(link);
  } else {
    let linkItem = document.querySelector(`[data-id="${target.dataset.id}"]`);
    target.classList.remove('in-favorites');
    target.textContent = 'Add to Favorites';
    favoriteItems = favoriteItems.filter(
      (item) => item.target !== target.dataset.id
    );
    linkItem.remove();
  }
  dataStorage.favorItem = favoriteItems;
  store();
  favoriteCountShow();
}

async function renderFavorites(id) {
  const favoriteItem = document.createElement('li');
  favoriteItem.classList.add('favorites-item');
  favoriteItem.setAttribute('data-id', id);
  let movie = await getMovie(id);
  let html = `<a class="favorites-link" href="film.html?id=${id}">
  <img class="favorites-cover" src="${
    getMovieData(movie).aboutImg
  }" title="movie">
  </a>`;
  favoriteItem.innerHTML = html;
  return favoriteItem;
}

function renderAllFavorites() {
  return favoriteItems
    .map(async (item) => await renderFavorites(item.target))
    .forEach(async (item) => favorites.append(await item));
}

renderAllFavorites();
