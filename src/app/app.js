//import * from "./ui";
import '../css/main.css';
import 'bootstrap';
import * as _ from 'lodash';

function apiSearch(keyword) {
  var api_key = "8fd5f0e9c49f8c346a2bd4df0229276a";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200)
    {
      parsedResponse = JSON.parse(request.responseText);
      movies = parsedResponse.results;
      console.log(movies);
      ui.sortMoviesByRating(movies);
      console.log(movies);
      fillMoviesTable(movies);
    }
  }
  request.open("GET", "http://localhost/3/search/movie/?api_key=" + api_key + "&include_adult=true&query=" + keyword);
  request.send();
}

function sortMoviesByRating(movies) {
    movies.sort(function(a, b) {
      return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
  return movies;
}

$('#searchForm').submit(function () {
  console.log('bla');
  var searchText = $('#searchInput').val();
  apiSearch(searchText);
  return false;
});
