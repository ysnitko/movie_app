const favorites = document.querySelector(".favorites");

async function addToFavorites(event) {
  let target = event.target;
  let link = await renderFavorites(target.dataset.id);
  let isFavorite = favoriteItems.some(
    (item) => item.target === target.dataset.id
  );
  if (!isFavorite) {
    target.classList.add("in-favorites");
    target.textContent = "Remove from Favorites";
    favoriteItems.push({
      target: target.dataset.id,
      title: link.textContent,
    });
    favorites.append(link);
    storeFavorites();
  } else {
    let linkItem = document.querySelector(`[data-id="${target.dataset.id}"]`);
    target.classList.remove("in-favorites");
    target.textContent = "Add to Favorites";
    favoriteItems = favoriteItems.filter(
      (item) => item.target !== target.dataset.id
    );
    linkItem.remove();
    storeFavorites();
  }
  favoriteCountShow();
}

async function renderFavorites(id) {
  const favoriteItem = document.createElement("li");
  favoriteItem.classList.add("favorites-item");
  favoriteItem.setAttribute("data-id", id);
  let movie = await getMovie(id);
  let html = `<a href="index.html?id=${id}">${movie.title}</a>`;
  favoriteItem.innerHTML = html;
  return favoriteItem;
}

function renderAllFavorites() {
  return favoriteItems
    .map(async (item) => await renderFavorites(item.target))
    .forEach(async (item) => favorites.append(await item));
}

function favoriteCountShow() {
  const favoriteCount = document.querySelector(".favorites-items");
  favoriteCount.textContent = `${favoriteItems.length}`;
  store(favoriteItems);
}

renderAllFavorites();
