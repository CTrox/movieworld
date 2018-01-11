import create from './movie-model';
import 'jest';

const movie = {id:123, title: 'abc', vote_average: 6.8, vote_count: 1200};

let model;
beforeEach(() => {
  model = create();
});

test('model is created', () => {
  expect(model).toBeDefined();
  expect(model.movieList.length).toEqual(0);
});

test('add one movie to model', () => {
  expect(model).toBeDefined();
  model.addMovie(movie);
  expect(model.movieList.length).toEqual(1);
  expect(model.getMovie(123).title).toBe('abc');
});
