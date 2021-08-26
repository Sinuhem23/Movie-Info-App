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
      // If the results property of data is not 0(none) then envoke the function showMovies passing the parameter of data's property, results
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        // Else display No Results Found on the main content of the body (<main>)
        main.innerHTML = `<h1 class='no_Results'>No Results Found</h1>`;
      }
    });
}

// Function which shows movies and data details
function showMovies(data) {
  main.innerHTML = '';
  data.forEach((movie) => {
    // creating multiple const (of which are properties of the api's results object) at once to equal the parameter of movie
    const { title, poster_path, vote_average, release_date, overview } = movie;
    // creating HTML element "movieElement"
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    // Dynamically populating into html
    movieElement.innerHTML = `<img src="${
      // if no image (poster_path) in the results object display chosen image
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
    // appending main body to the movieElement and displaying dynamic html elements
    main.appendChild(movieElement);
  });
}

// Function getColor recieves the vote as a parameter and out puts a color based on its number
function getColor(vote) {
  if (vote >= 8) {
    return 'red';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'green';
  }
}

// List of API's Genres
const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];
// calling setGenre - a function to search genres and dynamically create the list of genres
var selectedGenre = [];
setGenre();
function setGenre() {
  // Set empty to populate  with forEach
  tagsElement.innerHTML = '';
  // Getting each genre to populate in a new div with a class of "tag" and an id of it's genre's api id. Then displaying the name
  genres.forEach((genre) => {
    // creating an HTML element (genre_tags)
    const genre_tags = document.createElement('div');
    genre_tags.classList.add('tag');
    genre_tags.id = genre.id;
    genre_tags.innerText = genre.name;
    genre_tags.addEventListener('click', () => {
      // pushing the genre.id to the array selectedGenre
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          // remove array from selectedGenre when clicked again
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightSection();
    });
    tagsElement.append(genre_tags);
  });
}

// Function that adds highlight to selected dynamic genres / removes
function highlightSection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach((tag) => {
    tag.classList.remove('highlight');
  });
  // Calling resetBtn function
  resetBtn();
  // If genre are selected, highlighted class is given to be highlighted.
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    });
  }
}

// Function that adds highligt to reset btn if it exists else brings out a reset button once genre is highlighted
function resetBtn() {
  let resetBtn = document.getElementById('reset');
  // If a reset button exists, button is highlighted
  if (resetBtn) {
    resetBtn.classList.add('hightlight');
  } else {
    // If it does not exist, a new HTML element is created and attached to the DOM tree
    let reset = document.createElement('div');
    reset.classList.add('tag', 'highlight');
    reset.id = 'reset';
    reset.innerText = 'Reset';

    reset.addEventListener('click', () => {
      // Function that removes all the selected genres and restarts it (refresh)
      selectedGenre = [];
      setGenre();
      // to reset back as if page were refreshed
      getMovies(API_URL);
    });
    // appends reset to the tags HTML elements (tagsElements)
    tagsElement.append(reset);
  }
}

// Added an event listener to query searched word and display movies with word
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  // When a word is searched, it will remove any selected genre
  selectedGenre = [];
  highlightSection();

  if (searchTerm) {
    // If word searched, call function getMovies with the parameters of "searchURL + '&query=' + searchTerm"
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    // call getMovie function with the const variable API_URL as it's parameter - as if page were refreshed
    getMovies(API_URL);
  }
});
