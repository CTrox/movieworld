const api_base_url = 'http://localhost:8080/api'

// constructs and returns the full api url
function apiURL(endpoint, params = '') {
  return api_base_url + endpoint + params;
}

function responseToMovies(responseData) {
  var data = JSON.parse(responseData);
  console.log(data.results);
  return data.results;
}

export function searchMovies(query, fn) {
  $.get(apiURL('/search/', query), function (data) {
    fn(responseToMovies(data));
  });
}

export function topMovies(fn) {
  $.get(apiURL('/popular'), function (data) {
    fn(responseToMovies(data));
  });
}

export function popularMovies(fn) {
  $.get(apiURL('/top'), function (data) {
    fn(responseToMovies(data));
  });
}

export function upcomingMovies(fn) {
  $.get(apiURL('/upcoming'), function (data) {
    fn(responseToMovies(data));
  });
}
