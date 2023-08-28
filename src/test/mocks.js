import { rest } from "msw";

export const handlers = [
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

      if (id === "tt1234321") {
        return res(
          ctx.json({
            Title: "interstellar",
            Year: "2014",
            Poster: "interstellar_poster_url",
            Runtime: "169 min",
            imdbRating: "8.7",
            Plot: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot...",
            Released: "07 Nov 2014",
            Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastai",
            Director: "Christopher Nolan",
            Genre: "Adventure, Drama, Sci-Fi",
          })
        );
      }

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
