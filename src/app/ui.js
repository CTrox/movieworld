function fillMoviesTable(movies) {
  var tableBody = $('#movieTableBody');
  var rows = ['poster_path', 'vote_average', 'title', 'overview'];
  var imagePath = "https://image.tmdb.org/t/p/w154/"

  tableBody.empty();
  movies.forEach(function(movie) {
    var tableRow = $('<tr>');
    tableRow.append('<td><img src="' + imagePath + movie.poster_path + '"></td>');
    tableRow.append('<td>' + movie.rating + '</td>');
    tableRow.append('<td>' + movie.title + '</td>');
    tableRow.append('<td>' + movie.overview + '</td>');
    tableBody.append(tableRow);
  });
}

export default fillMoviesTable;
