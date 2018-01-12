import favorite from './app';

export function fillMoviesTable(movies) {
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
    if (movie.favorite) {
      // ugly
      var favoriteBtn = '<button id="fav-btn-' + movie.id + '"  class="btn btn-success">★</button>';
    } else {
      var favoriteBtn = '<button id="fav-btn-' + movie.id + '" class="btn btn-secondary">★</button>';
    }
    tableRow.append('<td>' + favoriteBtn + '</td>');
    tableBody.append(tableRow);
  });
}

export function populateDropdown(dropdown, genres) {
  const dropdownMenu = dropdown.next('.dropdown-menu');
  dropdownMenu.empty();
  for (const genre of genres) {
    dropdownMenu.append('<a id="genre-' + genre.id + '" class="dropdown-item">' + genre.name + '</a>');
  }
}

function prepareUI () {
  var formsNodeList = document.querySelectorAll('form');
  for (var i = 0; i < formsNodeList.length; i++) {
    formsNodeList[i].addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
}

prepareUI();
