//import * from "./ui";
import '../css/main.css';
import 'bootstrap';
import 'bootstrap/js/dropdown';
import * as _ from 'lodash';
import * as mModel from './movie_model';
import * as gModel from './genre_model';
import * as ui from './ui';
import * as api from './api';

const $genreDropdown = $('#genre-dropdown');
const $searchInput = $('#search-input');
const $search = $('#search-bar');
const $searchBtn = $('#search-btn');
const $topBtn = $('#top-btn');
const $popularBtn = $('#popular-btn');
const $upcomingBtn = $('#upcoming-btn');

$searchInput.on('blur', search);
$search.on('submit', search);
$searchBtn.on('click', search);
$topBtn.on('click', top);
$popularBtn.on('click', popular);
$upcomingBtn.on('click', upcoming);

const movieModel = mModel.create();
const genreModel = gModel.create();

function search() {
  const query = $searchInput.val();
  api.searchMovies(query, function(movies) {
    var sortedMovies = sortMoviesByRating(movies);
    for (const movie of sortedMovies) {
      movieModel.addMovie(movie);
    }
  });
}

function toggleDropdown() {
}

function getGenres() {
  api.getGenres(function(genres) {
    for (const genre of genres) {
      genreModel.addGenre(genre);
    }
    console.log(genreModel.getGenreByID(28));
  })
}

function top() {
  api.topMovies(function(movies) {
    var sortedMovies = sortMoviesByRating(movies);
    for (const movie of sortedMovies) {
      movieModel.addMovie(movie);
    }
  });
}

function popular() {
  api.popularMovies(function(movies) {
    for (const movie of movies) {
      movieModel.addMovie(movie);
    }
  });
}

function upcoming() {
  api.upcomingMovies(function(movies) {
    for (const movie of movies) {
      movieModel.addMovie(movie);
    }
  });
}

function sortMoviesByRating(movies) {
    movies.sort(function(a, b) {
      return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
  return movies;
}

$(movieModel).on('modelchange', () => {
  ui.fillMoviesTable(movieModel.movieList);
});

$(genreModel).on('modelchange', () => {
  console.log('populating dropdown');
  ui.populateDropdown($genreDropdown, genreModel.genreList);
});

getGenres();
