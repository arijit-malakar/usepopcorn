import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import WatchedMovie from "./WatchedMovie";

const movie = {
  imdbID: "tt1234567",
  title: "Inception",
  poster: "inception_poster_url",
  imdbRating: 8.8,
  userRating: 9,
  runtime: 148,
};

test("renders movie details and delete button", () => {
  render(<WatchedMovie movie={movie} onDeleteWatched={() => {}} />);

  const movieTitle = screen.getByText(movie.title);
  const imdbRating = screen.getByText(`${movie.imdbRating}`);
  const userRating = screen.getByText(`${movie.userRating}`);
  const runtime = screen.getByText(`${movie.runtime} min`);
  const deleteButton = screen.getByRole("button", { name: "X" });

  expect(movieTitle).toBeInTheDocument();
  expect(imdbRating).toBeInTheDocument();
  expect(userRating).toBeInTheDocument();
  expect(runtime).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test("calls onDeleteWatched on clicking delete button", () => {
  const mockOnClick = jest.fn();
  render(<WatchedMovie movie={movie} onDeleteWatched={mockOnClick} />);

  const deleteButton = screen.getByRole("button", { name: "X" });
  user.click(deleteButton);

  expect(mockOnClick).toHaveBeenCalledWith(movie.imdbID);
});
