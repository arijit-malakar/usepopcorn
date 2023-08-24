import { render, screen } from "@testing-library/react";
import NumResults from "./NumResults";

test("shows the correct number of movies", () => {
  const movies = [
    {
      imdbID: "tt123456",
      Title: "Shutter Island",
      Poster: "shutter_island_poster_url",
      Year: "2010",
    },
    {
      imdbID: "tt654321",
      Title: "Breathless",
      Poster: "breathless_poster_url",
      Year: "1961",
    },
  ];
  render(<NumResults movies={movies} />);

  const results = screen.getByText(`${movies.length}`);

  expect(results).toBeInTheDocument();
});
