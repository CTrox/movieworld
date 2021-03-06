var express = require('express');
var app = express();
var request = require('request');
var api_key;
var api_base_url = 'https://api.themoviedb.org/3'
var bodyParser = require('body-parser');
var mongodb = require('./mongodb');
var fs = require('fs');
var path = require('path');

var config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf8'));
console.log(config);
api_key = config.apiKey;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// constructs and returns the full api url
function apiURL(endpoint, params = '') {
  return api_base_url + endpoint + '?api_key=' + api_key + params;
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
  // sorts by average votes and filters out crap with vote_count > 100
  var params = '&page=1&sort_by=vote_average.desc&vote_count.gte=100&with_genres=' + req.params.genre_id;
  var url = apiURL('/discover/movie', params);
  requestAndRespond(url, res);
});

app.get('/upcoming', (req, res) => {
  var url = apiURL('/movie/upcoming', '&page=1');
  requestAndRespond(url, res);
});

app.post('/favorite', (req, res) => {
  console.log("fav", req.body);
  if (req.body.favorite == "true") {
    console.log("inserting movie", req.body.id)
    mongodb.insert('favorites', {"id": req.body.id, "favorite": req.body.favorite});
  } else {
    console.log("removing movie", req.body.id)
    mongodb.remove('favorites', {"id": req.body.id, "favorite": req.body.favorite});
  }
  res.send("Got it");
});

app.get('/favorite', (req, res) => {
  mongodb.find('favorites', function(docs) {
    res.send(docs);
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Not found");
});


app.listen(8888);
