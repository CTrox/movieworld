import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
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
var currentGenre;

function search() {
  const query = $searchInput.val();
  api.searchMovies(query, function(movies) {
    var sortedMovies = sortMoviesByRating(movies);
    movieModel.addMovies(sortedMovies);
  });
}

function favorite(movie) {
  movieModel.toggleFavorite(movie.id)
  api.favMovie(movie, function() {
    console.log("Favorited movie", movie.title);
  });
}

function switchGenre(genre) {
  console.log(genre);
  $('#genre-dropdown').text(genre.name);
  currentGenre = genre;
}

function getGenres() {
  api.getGenres(function(genres) {
    for (const genre of genres) {
      genreModel.addGenre(genre);
    }
    console.log(genreModel.getGenreByID(28));
  });
}

// gets favorites and updates the ui
function updateFavorites() {
  api.getFavorites(function(data) {
    for (const movie of movieModel.movieList) {
      data.forEach (function(fav){
        if (movie.id == fav.id) {
          var isFav = (fav.favorite == "true");
          if (isFav !== movie.favorite) {
            movieModel.toggleFavorite(movie.id);
          }
        }
      });
    }
  });
}

function top() {
  if (typeof currentGenre !== 'undefined' && currentGenre) {
    api.topMoviesByGenre(currentGenre, function(movies) {
      var sortedMovies = sortMoviesByRating(movies);
      movieModel.addMovies(sortedMovies);
    });
  } else {
    api.topMovies(function(movies) {
      var sortedMovies = sortMoviesByRating(movies);
      movieModel.addMovies(sortedMovies);
    });
  }
}

function popular() {
  api.popularMovies(function(movies) {
    movieModel.addMovies(movies);
  });
}

function upcoming() {
  api.upcomingMovies(function(movies) {
    movieModel.addMovies(movies);
  });
}

function sortMoviesByRating(movies) {
    movies.sort(function(a, b) {
      return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
  return movies;
}

$(movieModel).on('modelchange', () => {
  console.log("Movie model change");
  ui.fillMoviesTable(movieModel.movieList);
  // set fav button onclicks
  for (const movie of movieModel.movieList) {
    $('#fav-btn-' + movie.id).on('click', function() {
      favorite(movie);
    });
  }
  updateFavorites();
});

$(genreModel).on('modelchange', () => {
  console.log('populating dropdown');
  ui.populateDropdown($genreDropdown, genreModel.genreList);
  for (const genre of genreModel.genreList) {
    $('#genre-' + genre.id).on('click', function() {
      switchGenre(genre);
    });
  }
});

getGenres();
