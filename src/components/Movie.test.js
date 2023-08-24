import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Movie from "./Movie";

const movie = {
  imdbID: "tt123456",
  Title: "Test Movie",
  Poster: "test_poster_url",
  Year: "2023",
};

test("renders movie poster with correct image source, title and release year", () => {
  render(<Movie movie={movie} onSelectMovie={() => {}} />);

  const moviePoster = screen.getByRole("img", {
    name: `${movie.Title} poster`,
  });
  const movieTitle = screen.getByRole("heading", { name: movie.Title });
  const movieYear = screen.getByText(movie.Year);

  expect(moviePoster).toBeInTheDocument();
  expect(movieTitle).toBeInTheDocument();
  expect(movieYear).toBeInTheDocument();
  expect(moviePoster.getAttribute("src")).toBe(movie.Poster);
});

test("calls onSelectMovie handler on clicking a movie", () => {
  const mock = jest.fn();
  render(<Movie movie={movie} onSelectMovie={mock} />);

  const movieItem = screen.getByRole("listitem");
  user.click(movieItem);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(movie.imdbID);
});
