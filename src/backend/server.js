var express = require('express');
var app = express();

app.get('/search/:query', (req, res) => {
  var api_key = "8fd5f0e9c49f8c346a2bd4df0229276a";
  var request = require('request');
  var url = "https://api.themoviedb.org/3/search/movie/?api_key=" + api_key + "&include_adult=true&query=" + req.params.query
  request(url, function (error, response, body) {
    res.status(response.statusCode).send(body);
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Not found");
});

app.listen(8888);
