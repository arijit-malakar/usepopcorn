import { render, screen } from "@testing-library/react";
import MoviesList from "./MoviesList";

test("renders list of movies with the correct handlers", () => {
  const movies = [
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
  render(<MoviesList movies={movies} onSelectMovie={mock} />);

  const movieItems = screen.getAllByRole("listitem");

  expect(movieItems).toHaveLength(2);
  movieItems.forEach((movieItem) => {
    expect(movieItem).toBeInTheDocument();
  });
});

test("renders without errors when movies array is empty", () => {
  const movies = [];
  const mock = jest.fn();

  render(<MoviesList movies={movies} onSelectMovie={mock} />);
});
