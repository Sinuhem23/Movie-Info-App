// API key from https://www.themoviedb.org/settings/api (must be logged in)
const API_KEY = 'api_key=757926b73184db4403654485269cc362';
const BASE_URL = 'https://api.themoviedb.org/3';
// List popularity url link
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// List images url link
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');

const search = document.getElementById('search');
const tagsElement = document.getElementById('tags');

// Calling getMovie function using API with discover movie
getMovies(API_URL);
// Generic function to gather data from url
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        main.innerHTML = `<h1 class='no_Results'>No Results Found</h1>`;
      }
    });
}

// Function to all show movies and some data details
function showMovies(data) {
  main.innerHTML = '';
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `<img src="${
      poster_path
        ? IMG_URL + poster_path
        : 'https://www.starpik.com/wp-content/uploads/_sz/126430.jpg'
    }" alt"${title}>

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>

    </div>
    <p class="releaseDate">${release_date}</p>

      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    
    `;
    main.appendChild(movieElement);
  });
}

// Get ratings and colors
function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
