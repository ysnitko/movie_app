const MOVIE_COVER = [
  {
    id: 1,
    rating: 8.6,
    src: './img/a_new_hope.jpg',
  },
  {
    id: 2,
    rating: 7.6,
    src: './img/empire_strikes.jpg',
  },
  {
    id: 3,
    rating: 8.1,
    src: './img/return-of-the-jedi.jpg',
  },
  {
    id: 4,
    rating: 7.8,
    src: './img/the-phantom-menace.jpg',
  },
  {
    id: 5,
    rating: 6.9,
    src: './img/Attack_of_the_clones_novel.jpg',
  },
  {
    id: 6,
    rating: 7.5,
    src: './img/revenge_of_the_sith.jpg',
  },
  {
    id: 7,
    rating: 8.9,
    src: './img/the_force_awakens.jpg',
  },
];
function storeUser() {
  localStorage.setItem('userList', JSON.stringify(userList));
}

function restoreUsers() {
  return JSON.parse(localStorage.getItem('userList'));
}

const data = [
  {
    birth_year: '112BBY',
    born: -112,
    created: '2014-12-10T15:10:51.357000Z',
    edited: '2014-12-20T21:17:50.309000Z',
    eye_color: 'yellow',
    films: ['1', '2', '3', '4', '5', '6'],
    homeworld: 'tatooine}',
  },
  {
    birth_year: '112BBY',
    born: -112,
    created: '2014-12-10T15:10:51.357000Z',
    edited: '2014-12-20T21:17:50.309000Z',
    eye_color: 'yellow',
    films: ['1', '2', '4', '5', '6'],
    homeworld: 'tatooine}',
  },
];
async function loadMovieCharacters(id) {
  const charactersContainer = document.querySelector('.characters-container');
  const promises = Array.from({ length: 87 }, (_, i) => loadCharacter(i + 1));
  let charactersList = await Promise.all(promises);
  console.log(charactersList);
  let movie = await loadMovie(id);
  console.log(typeof movie.id);
  charactersList
    .find((character) => {
      let cr = character.films;
      return cr === movie.id;
    })
    .map((character) => {
      const characteritem = document.createElement('div');
      const html = `
  <img src="" alt="">
  <span>birth_year: ${character.films}</span>
  `;
      characteritem.innerHTML = html;
      return characteritem;
    })
    .forEach((character) => charactersContainer.append(character));
}
