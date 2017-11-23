export function fillMoviesTable(movies) {
  var tableBody = $('#movieTableBody');
  var rows = ['poster_path', 'vote_average', 'title', 'overview'];
  var imagePath = "https://image.tmdb.org/t/p/w154/"

  tableBody.empty();
  movies.forEach(function(movie) {
    var tableRow = $('<tr>');
    rows.forEach(function(item) {
      if (item == 'poster_path') {
        tableRow.append('<td><img src="' + imagePath + movie[item] + '"></td>');
      } else {
        tableRow.append('<td>' + movie[item] + '</td>');
      }
    });
    tableBody.append(tableRow);
  });
}
