import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import App from "./App";

const handlers = [
  rest.get(`http://www.omdbapi.com/`, (req, res, ctx) => {
    if (req.url.searchParams.get("s")) {
      const query = req.url.searchParams.get("s");

      if (query && query.length >= 3) {
        if (query.startsWith("int")) {
          return res(
            ctx.json({
              Search: [
                {
                  Poster: "poster1_url",
                  Title: "interstellar",
                  Year: "2023",
                  imdbID: "tt1234321",
                },
                {
                  Poster: "poster2_url",
                  Title: "interstellar wars",
                  Year: "2016",
                  imdbID: "tt1234567",
                },
              ],
            })
          );
        }
        if (query === "invalidquery") {
          return res(
            ctx.json({
              Response: "False",
            })
          );
        }
      }
    } else if (req.url.searchParams.get("i")) {
      const id = req.url.searchParams.get("i");

      if (id === "tt1234567") {
        return res(
          ctx.json({
            Title: "interstellar wars",
            Year: "2016",
            Poster: "interstellar_wars_poster_url",
            Runtime: "83 min",
            imdbRating: "1.7",
            Plot: "Beyond the dark side of the moon, an ancient portal opens",
            Released: "12 Mar 2016",
            Actors: "Brian Lally, Marlene Mc'Cohen, Robert Woods",
            Director: "Marlene Mc'Cohen",
            Genre: "Sci-Fi",
          })
        );
      }
    }
  }),
];

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

test("shows loading text and then hides it after successful fetching of movie", async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/search movies/i);
  fireEvent.change(searchInput, { target: { value: "int" } });

  const loadingText = await screen.findByText("Loading...");
  expect(loadingText).toBeInTheDocument();

  await waitFor(() => {
    expect(loadingText).not.toBeInTheDocument();
  });

  const movieTitle = await screen.findByText("interstellar");
  expect(movieTitle).toBeInTheDocument();
});

test("renders error text when searched for an invalid query", async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/search movies/i);
  fireEvent.change(searchInput, { target: { value: "invalidquery" } });

  const errorMessage = await screen.findByText("Movie not found");

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass("error");
});

test("renders movie details on clicking a movie from the search result", async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/search movies/i);
  fireEvent.change(searchInput, { target: { value: "int" } });

  //   const movieListItem = await screen.findByTestId(
  //     "list-item-interstellar wars"
  //   );

  const movieTitle = await screen.findByText("interstellar wars");
  fireEvent.click(movieTitle);

  const moviePoster = await screen.findByRole("img", {
    name: "Poster of interstellar wars movie",
  });
  expect(moviePoster).toBeInTheDocument();
});

// test('renders 1 result when searched for "interstellar" movie', () => {
//   render(<App />);
//   const searchInput = screen.getByPlaceholderText(/search movies/i);
//   fireEvent.change(searchInput, { target: { value: "interstellar" } });

//   const loadingText = screen.getByText("Loading...");
//   expect(loadingText).toBeInTheDocument();
// });

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 200);
  });
