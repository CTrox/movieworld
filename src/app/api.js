const api_base_url = 'http://localhost:8080/api'

// constructs and returns the full api url
function apiURL(endpoint, params = '') {
  return api_base_url + endpoint + params;
}

function parseResponse(responseData) {
  var data = JSON.parse(responseData);
  console.log(data);
  return data;
}

export function searchMovies(query, fn) {
  $.get(apiURL('/search/', query), function (data) {
    fn(parseResponse(data).results);
  });
}

export function getGenres(fn) {
  $.get(apiURL('/genres'), function (data) {
    fn(parseResponse(data).genres);
  });
}

export function topMovies(fn) {
  $.get(apiURL('/top'), function (data) {
    fn(parseResponse(data).results);
  });
}

export function topMoviesByGenre(genre, fn) {
  $.get(apiURL('/top_genre/' + genre.id), function (data) {
    fn(parseResponse(data).results);
  });
}

export function popularMovies(fn) {
  $.get(apiURL('/popular'), function (data) {
    fn(parseResponse(data).results);
  });
}

export function upcomingMovies(fn) {
  $.get(apiURL('/upcoming'), function (data) {
    fn(parseResponse(data).results);
  });
}

export function favMovie(movie, fn) {
  $.post(apiURL('/favorite'), movie, function (data) {
    fn(data);
  });
}

export function getFavorites(fn) {
  $.get(apiURL('/favorite'), function (data) {
    fn(data);
  });
}
