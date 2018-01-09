//import * from "./ui";
import '../css/main.css';
import 'bootstrap';
import * as _ from 'lodash';
import createModel from './movie_model';
import * as ui from './ui';
import * as api from './api';

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

const model = createModel();

function search() {
  const query = $searchInput.val();
  api.searchMovies(query, function(movies) {
    var sortedMovies = sortMoviesByRating(movies);
    for (const movie of sortedMovies) {
      model.addMovie(movie);
    }
  });
}

function top() {
  api.topMovies(function(movies) {
    for (const movie of movies) {
      model.addMovie(movie);
    }
  });
}

function popular() {
  api.popularMovies(function(movies) {
    for (const movie of movies) {
      model.addMovie(movie);
    }
  });
}

function upcoming() {
  api.upcomingMovies(function(movies) {
    for (const movie of movies) {
      model.addMovie(movie);
    }
  });
}

function sortMoviesByRating(movies) {
    movies.sort(function(a, b) {
      return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
  return movies;
}

$(model).on('modelchange', () => {
    ui.fillMoviesTable(model.movieList);
});
