const favorites = document.querySelector('.favorites');
let favoriteItems = restore().favoritesItem || [];
renderAllFavorites();

async function addToFavorites(event) {
  let target = event.target;
  if (favoriteItems.some((item) => item.target === target.dataset.id)) {
    return;
  }
  let link = await renderFavorites(target.dataset.id);
  favoriteItems.push({ target: target.dataset.id, title: link.textContent });
  favorites.append(link);
  store(favoriteItems);
}

async function renderFavorites(id) {
  const favoriteItem = document.createElement('li');
  let movie = await loadMovie(id);
  let html = `<a href="index.html?id=${id}">${movie.title}</a>`;
  favoriteItem.innerHTML = html;
  return favoriteItem;
}

function renderAllFavorites() {
  // favoriteItems.forEach(async (item) =>
  //   favorites.append(await renderFavorites(item.target))
  // );
  // favoriteCountShow();
  // {
  const favoriteItem = document.createElement('li');
  let html = `<a href="index.html?id=${item.target}">${item.title}</a>`;
  favoriteItem.innerHTML = html;
  return favoriteItem;
}

function favoriteCountShow() {
  const favoriteCount = document.querySelector('.favorites-items');
  favoriteCount.textContent = `${favoriteItems.length}`;
  console.log(favoriteItems.length);
}
////old

// const favorites = document.querySelector('.favorites');
// let favoriteItems = restore().favoritesItem || [];
// console.log(favoriteItems);
// renderAllFavorites();

// async function renderFavorites(id) {
//   const favoriteItem = document.createElement('li');
//   let movie = await loadMovie(id);
//   let html = `<a href="index.html?id=${id}">${movie.title}</a>`;
//   favoriteItem.innerHTML = html;
//   return favoriteItem;
// }

// async function addToFavorites(event) {
//   let target = event.target;
//   let link = await renderFavorites(target.dataset.id);
//   favoriteItems.push({ target: target.dataset.id, title: link.textContent });
//   console.log(favoriteItems);
//   favorites.append(link);
//   store(favoriteItems);
// }

// function renderAllFavorites() {
//   favoriteItems
//     .map((item) => {
//       const favoriteItem = document.createElement('li');
//       let html = `<a href="index.html?id=${item.target}">${item.title}</a>`;
//       favoriteItem.innerHTML = html;
//       return favoriteItem;
//     })
//     .forEach((item) => favorites.append(item));
// }
