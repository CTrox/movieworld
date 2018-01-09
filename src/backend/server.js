var express = require('express');
var app = express();
var request = require('request');
var api_key = "8fd5f0e9c49f8c346a2bd4df0229276a";
var api_base_url = 'https://api.themoviedb.org/3'

// constructs and returns the full api url
function apiURL(endpoint, params = '') {
  return api_base_url + endpoint + '?api_key=' + api_key + params
}

// sends a request to url and sends response to res
function requestAndRespond(url, res, method = 'GET') {
  request({
    method: method,
    uri: url,
  },
    function (error, response, body) {
      if (typeof response !== 'undefined' && response) {
        res.status(response.statusCode).send(body);
      } else {
        res.status(500).send("Invalid response from movieDB API");
      }
  });
}

app.get('/genres', (req, res) => {
  var url = apiURL('/genre/movie/list');
  requestAndRespond(url, res);
});

app.get('/search/:query', (req, res) => {
  var url = apiURL('/search/movie', '&query=' + req.params.query);
  requestAndRespond(url, res);
});

app.get('/popular', (req, res) => {
  var url = apiURL('/movie/popular', '&page=1');
  requestAndRespond(url, res);
});

app.get('/top', (req, res) => {
  var url = apiURL('/movie/top_rated', '&page=1');
  requestAndRespond(url, res);
});

app.get('/top_genre/:genre_id', (req, res) => {
  var params = '&page=1&sort_by=vote_average.desc&with_genres=' + req.params.genre_id;
  var url = apiURL('/discover/movie', params);
  requestAndRespond(url, res);
});

app.get('/upcoming', (req, res) => {
  var url = apiURL('/movie/upcoming', '&page=1');
  requestAndRespond(url, res);
});

app.use(function (req, res, next) {
  res.status(404).send("Not found");
});

app.listen(8888);
