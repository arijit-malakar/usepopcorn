import { render, screen } from "@testing-library/react";
import WatchedMoviesList from "./WatchedMoviesList";

test("renders list of watched movies with the correct handlers", () => {
  const watchedMovies = [
    {
      imdbID: "tt123456",
      Title: "Inception",
      Poster: "inception_poster_url",
      Year: "2010",
    },
    {
      imdbID: "tt654321",
      Title: "2001: A Space Odyssey",
      Poster: "2001_a_space_odyssey_poster_url",
      Year: "1968",
    },
  ];
  const mock = jest.fn();
  render(<WatchedMoviesList watched={watchedMovies} onDeleteWatched={mock} />);

  const watchedMovieItems = screen.getAllByRole("listitem");

  expect(watchedMovieItems).toHaveLength(2);
  watchedMovieItems.forEach((watchedMovie) => {
    expect(watchedMovie).toBeInTheDocument();
  });
});

test("renders without errors when there are no watched movies", () => {
  const watchedMovies = [];
  const mock = jest.fn();

  render(<WatchedMoviesList watched={watchedMovies} onDeleteWatched={mock} />);
});
