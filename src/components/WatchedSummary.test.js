import { render, screen } from "@testing-library/react";
import WatchedSummary from "./WatchedSummary";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const watched = [
  { imdbRating: 8.5, userRating: 4.5, runtime: 120 },
  { imdbRating: 7.2, userRating: 3.8, runtime: 110 },
];

test("renders correct watched movie summary", () => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  render(<WatchedSummary watched={watched} />);

  const summaryHeading = screen.getByRole("heading", {
    name: /movies you watched/i,
  });
  const watchedLength = screen.getByText(`${watched.length} movies`);
  const textAvgImdbRating = screen.getByText(`${avgImdbRating}`);
  const textUserRating = screen.getByText(`${avgUserRating}`);
  const textRuntime = screen.getByText(`${avgRuntime} min`);

  expect(summaryHeading).toBeInTheDocument();
  expect(watchedLength).toBeInTheDocument();
  expect(textAvgImdbRating).toBeInTheDocument();
  expect(textUserRating).toBeInTheDocument();
  expect(textRuntime).toBeInTheDocument();
});
