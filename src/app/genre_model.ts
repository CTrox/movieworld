export interface GenreModel {
  genreList: Genre[];
  addGenre: (Genre: any) => void;
  getGenreByName: (name: string) => Genre;
  getGenreByID: (id: number) => Genre;
}

class Genre{
  public id: number;
  public name: string;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export function create() {
  function addGenre(genre: any) {
    model.genreList.push(new Genre(genre.id, genre.name));
    notifyModelChange();
  }

  function getGenreByName(name: string) {
    return model.genreList.find((genre) => {
      return genre.name === name;
    });
  }

  function getGenreByID(id: number) {
    return model.genreList.find((genre) => {
      return genre.id === id;
    });
  }

  function notifyModelChange() {
    $model.trigger('modelchange');
  }

  const model: GenreModel = {genreList: undefined, addGenre, getGenreByName, getGenreByID};
  model.genreList = [];
  const $model = $(model);

  return model;
}
