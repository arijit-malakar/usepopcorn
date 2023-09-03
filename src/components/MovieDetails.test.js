import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers } from "../test/mocks";
import MovieDetails from "./MovieDetails";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

const watched = [
  {
    imdbID: "tt0088763",
    imdbRating: 8.5,
    poster: "back_to_the_future_poster",
    runtime: 116,
    title: "Back to the Future",
    userRating: 8,
    year: "1985",
  },
];

const watchedExisting = [
  {
    imdbID: "tt1234321",
    imdbRating: 8.7,
    poster: "interstellar_poster",
    runtime: 169,
    title: "Interstellar",
    userRating: 9,
    year: "2014",
  },
];

test("renders movie details and rating from selectedId, if it differs from watched movie", async () => {
  render(<MovieDetails selectedId="tt1234321" watched={watched} />);

  const loadingText = await screen.findByText("Loading...");
  expect(loadingText).toBeInTheDocument();

  const posterImg = await screen.findByRole("img", {
    name: "Poster of interstellar movie",
  });
  const movieDetails = screen.getByTestId("movie-details");
  const starButton = screen.getAllByTestId("star-button");

  expect(posterImg).toBeInTheDocument();
  expect(movieDetails).toBeInTheDocument();
  [
    "interstellar",
    "07 Nov 2014 • 169 min",
    "Adventure, Drama, Sci-Fi",
    "8.7 IMDb rating",
  ].map((text) => expect(movieDetails).toHaveTextContent(text));
  expect(starButton).toHaveLength(10);
  [
    "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot...",
    "Starring Matthew McConaughey, Anne Hathaway, Jessica Chastai",
    "Directed by Christopher Nolan",
  ].map((text) => expect(screen.getByText(text)).toBeInTheDocument());
});

test("shows user rating, if the movie exists in watch list", async () => {
  render(<MovieDetails selectedId="tt1234321" watched={watchedExisting} />);

  const ratedText = await screen.findByText("You rated this movie 9");
  expect(ratedText).toBeInTheDocument();
});

test("calls onAddWatched and onCloseMovie handlers on clicking Add to List button", async () => {
  const mockOnAdd = jest.fn();
  const mockOnClose = jest.fn();
  render(
    <MovieDetails
      selectedId="tt1234321"
      watched={watched}
      onAddWatched={mockOnAdd}
      onCloseMovie={mockOnClose}
    />
  );

  const starButton = await screen.findAllByTestId("star-button");
  const seventhStar = starButton[6];
  expect(seventhStar).toBeInTheDocument();
  fireEvent.click(seventhStar);

  const addToListButton = screen.getByRole("button", {
    name: "+ Add to list",
  });
  expect(addToListButton).toBeInTheDocument();
  fireEvent.click(addToListButton);

  expect(mockOnAdd).toHaveBeenCalledWith({
    imdbID: "tt1234321",
    title: "interstellar",
    year: "2014",
    poster: "interstellar_poster_url",
    imdbRating: 8.7,
    runtime: 169,
    userRating: 7,
    countRatingDecisions: 1,
  });
  expect(mockOnClose).toHaveBeenCalled();
});

test("calls onCloseMovie on pressing Escape key", async () => {
  const mockOnClose = jest.fn();
  render(
    <MovieDetails
      selectedId="tt1234321"
      watched={watched}
      onAddWatched={() => {}}
      onCloseMovie={mockOnClose}
    />
  );

  const posterImg = await screen.findByRole("img", {
    name: "Poster of interstellar movie",
  });
  expect(posterImg).toBeInTheDocument();

  user.type(document.body, "{esc}");
  expect(mockOnClose).toHaveBeenCalled();
});

test("calls onCloseMovie on clicking ← button", async () => {
  const mockOnClose = jest.fn();
  render(
    <MovieDetails
      selectedId="tt1234567"
      watched={watched}
      onAddWatched={() => {}}
      onCloseMovie={mockOnClose}
    />
  );

  const posterImg = await screen.findByRole("img", {
    name: "Poster of interstellar wars movie",
  });
  const backButton = screen.getByRole("button", { name: "←" });

  expect(posterImg).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();

  user.click(backButton);
  expect(mockOnClose).toHaveBeenCalled();
});

test("updates document title with movie title", async () => {
  render(<MovieDetails selectedId="tt1234321" watched={watched} />);

  const posterImg = await screen.findByRole("img", {
    name: "Poster of interstellar movie",
  });

  expect(posterImg).toBeInTheDocument();
  expect(document.title).toBe("Movie | interstellar");
});
