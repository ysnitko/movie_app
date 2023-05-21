const favorites = document.querySelector('.favorites');
let favoriteItems = restore().favoritesItem || [];
console.log(favoriteItems);
generateFavoritesItem();
async function generateFavoritesItem() {
  let movie = await loadMovie('all');
  movie
    .map((item) => {
      const element = document.createElement('li');
      element.setAttribute('data-movie', `${item.id}`);
      element.classList.add('favorites-link');
      const html = `<a href="index.html?id=${item.id}">${item.title}</a>`;
      element.innerHTML = html;
      favoriteItems.push(element);
      return element;
    })
    .forEach((item) => favorites.appendChild(item));
}

function addToFavorites(event) {
  const favoritesLinks = document.querySelectorAll('.favorites-link');
  let target = event.target;
  for (let index = 0; index < favoritesLinks.length; index++) {
    let element = favoritesLinks[index];
    if (target.dataset.id === element.dataset.movie) {
      element.classList.add('show');
      // favoriteItems.push(element);
      store(favoriteItems);
    }
  }
  generateFavoritesItem();
}
