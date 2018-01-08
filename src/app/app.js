//import * from "./ui";
import '../css/main.css';
import 'bootstrap';
import * as _ from 'lodash';
import fillMoviesTable from './ui';

function apiSearch(keyword) {
  var api_key = "8fd5f0e9c49f8c346a2bd4df0229276a";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200)
    {
      var parsedResponse = JSON.parse(request.responseText);
      var movies = parsedResponse.results;
      console.log(movies);
      sortMoviesByRating(movies);
      console.log(movies);
      fillMoviesTable(movies);
    }
  }
  request.open("GET", "http://localhost:8080/api/search/" + keyword);
  request.send();
}

function sortMoviesByRating(movies) {
    movies.sort(function(a, b) {
      return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
  return movies;
}

$('#searchForm').submit(function () {
  var searchText = $('#searchInput').val();
  apiSearch(searchText);
  return false;
});
