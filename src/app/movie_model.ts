export interface MovieModel {
  movieList: Movie[];
  addMovies: (movies: any, clear: boolean) => void;
  getMovie: (id: number) => Movie;
  toggleFavorite: (id: number) => void;
  resetMovieList: () => void;
}

class Movie {
  public id: number;
  public title: string;
  public overview: string;
  public poster_path: string;
  public rating: number;
  public votes: number;
  public favorite: boolean;

  constructor(id, title, overview, poster_path, rating, votes, favorite) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.rating = rating;
    this.votes = votes;
    this.favorite = favorite;
  }
}

export function create() {

  function addMovies(movies: any, clear=true) {
    if (clear) {
      resetMovieList();
    }
    for (const movie of movies) {
      model.movieList.push(new Movie(
        movie.id,
        movie.title,
        movie.overview,
        movie.poster_path,
        movie.vote_average,
        movie.vote_count,
        movie.favorite)
      );
    }
    notifyModelChange();
  }

  function getMovie(id: number) {
    return model.movieList.find((movie) => {
      return movie.id === id;
    });
  }

  function toggleFavorite(id: number) {
    for (const movie of model.movieList) {
      if (movie.id === id) {
        movie.favorite = !movie.favorite;
        notifyModelChange();
      }
    }
  }

  function resetMovieList() {
    model.movieList = [];
    notifyModelChange();
  }

  function notifyModelChange() {
    $model.trigger('modelchange');
  }

  const model: MovieModel = {movieList: undefined, addMovies, getMovie, resetMovieList, toggleFavorite};
  model.movieList = [];
  const $model = $(model);

  return model;
}
