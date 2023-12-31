import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers } from "./test/mocks";
import App from "./App";

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

function renderAndSearch(query) {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/search movies/i);
  fireEvent.change(searchInput, { target: { value: query } });
}

test("shows loading text and then hides it after successful fetching of movie", async () => {
  renderAndSearch("int");

  const loadingText = await screen.findByText("Loading...");
  expect(loadingText).toBeInTheDocument();

  await waitFor(() => {
    expect(loadingText).not.toBeInTheDocument();
  });

  const movieTitle = await screen.findByText("interstellar");
  expect(movieTitle).toBeInTheDocument();
});

test("renders error text when searched for an invalid query", async () => {
  renderAndSearch("invalidquery");

  const errorMessage = await screen.findByText("Movie not found");

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass("error");
});

test("renders movie details on clicking a movie from the search result and hides it on clicking again", async () => {
  renderAndSearch("int");

  const movieTitle = await screen.findByText("interstellar wars");
  fireEvent.click(movieTitle);

  const moviePoster = await screen.findByRole("img", {
    name: "Poster of interstellar wars movie",
  });
  const movieDetails = screen.getByTestId("movie-details");

  expect(moviePoster).toBeInTheDocument();
  expect(movieDetails).toBeInTheDocument();
  expect(movieDetails).toHaveTextContent("interstellar wars");
  fireEvent.click(movieTitle);
  expect(moviePoster).not.toBeInTheDocument();
  expect(movieDetails).not.toBeInTheDocument();
  expect(document.title).toBe("usePopcorn");
});

test("renders watched movie and updates watched summary on adding a movie from movie details", async () => {
  renderAndSearch("int");

  const movieTitle = await screen.findByText("interstellar");
  fireEvent.click(movieTitle);

  const starButton = await screen.findAllByTestId("star-button");
  const fourthStar = starButton[3];
  expect(fourthStar).toBeInTheDocument();
  fireEvent.click(fourthStar);

  const addToListButton = screen.getByRole("button", {
    name: "+ Add to list",
  });
  expect(addToListButton).toBeInTheDocument();
  fireEvent.click(addToListButton);

  const watchedCount = screen.getByText("1 movies");
  expect(watchedCount).toBeInTheDocument();

  const watchedListItem = screen.getAllByTestId("watched-movie-listitem");
  expect(watchedListItem).toHaveLength(1);
  const watchedDetails = {
    name: "interstellar",
    imdbRating: "8.7",
    userRating: "4",
    runtime: "169 min",
    deleteButton: "X",
  };
  for (const field in watchedDetails) {
    expect(watchedListItem[0]).toHaveTextContent(watchedDetails[field]);
  }
});

test("clears movie from the watched list and updates watched summary on removing a movie", () => {
  render(<App />);

  const watchedListItem = screen.getAllByTestId("watched-movie-listitem");
  const watchedImage = screen.getByRole("img", { name: "interstellar poster" });
  const deleteWatched = screen.getByRole("button", { name: "X" });

  expect(watchedListItem).toHaveLength(1);
  expect(watchedListItem[0]).toHaveTextContent("interstellar");
  expect(watchedImage).toBeInTheDocument();
  expect(deleteWatched).toBeInTheDocument();

  fireEvent.click(deleteWatched);

  const watchedCount = screen.getByText("0 movies");
  expect(watchedCount).toBeInTheDocument();
  const noWatchedListItem = screen.queryByTestId("watched-movie-listitem");
  expect(noWatchedListItem).not.toBeInTheDocument();
});

test("clears input and focuses on the search field when Enter key is pressed from a different element", async () => {
  render(<App />);

  const searchField = screen.getByPlaceholderText(/search movies/i);

  fireEvent.change(searchField, { target: { value: "int" } });

  const movieTitle = await screen.findByText("interstellar");
  fireEvent.click(movieTitle);

  const moviePoster = await screen.findByRole("img", {
    name: "Poster of interstellar movie",
  });

  expect(moviePoster).toBeInTheDocument();
  expect(searchField).not.toHaveFocus();

  fireEvent.keyDown(moviePoster, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
    keyCode: 13,
  });

  await waitFor(() => {
    expect(searchField).toHaveFocus();
  });
  await waitFor(() => {
    expect(searchField).toHaveValue("");
  });
});

test("does not clear search input when Enter key is pressed when focused on the search element", () => {
  render(<App />);

  const searchField = screen.getByPlaceholderText(/search movies/i);

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    user.type(searchField, "int{enter}");
  });

  expect(searchField).toHaveFocus();
  expect(searchField).toHaveValue("int");
});
