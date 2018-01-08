//import * from "./ui";
import '../css/main.css';
import 'bootstrap';
import * as _ from 'lodash';
import fillMoviesTable from './ui';
import createModel from './movie_model';

const $searchInput = $('#search-input');
const $search = $('#search-bar');
const $searchBtn = $('#search-btn');

$searchInput.on('blur', search);
$search.on('submit', search);
$searchBtn.on('click', search);

const model = createModel();

function search() {
  const query = $searchInput.val();
  const url = 'http://localhost:8080/api/search/' + query
  $.get(url, function (data) {
    var data = JSON.parse(data);
    const movies = data.results;
    var sortedMovies = sortMoviesByRating(movies);
    for (const movie of sortedMovies) {
      model.addMovie(movie);
    }
  });
}

function prepareUI () {
  var formsNodeList = document.querySelectorAll('form');
  for (var i = 0; i < formsNodeList.length; i++) {
    formsNodeList[i].addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
}

function sortMoviesByRating(movies) {
    movies.sort(function(a, b) {
      return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
  return movies;
}

$(model).on('modelchange', () => {
    fillMoviesTable(model.movieList);
});

prepareUI();
