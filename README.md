# usePopcorn

## Overview

`usePopcorn` is a React application that allows users to search for movies by fetching data from the OMDb API. The app displays a list of search results, and users can click on any movie to view its details, including the movie poster, name, cast, crew, IMDb rating, and a rating field to add the movie to their watchlist along with a user-provided rating. Users cannot add a rating to the same movie again.

Once a movie is added to the watchlist, a summary of watched movies is displayed, showing the calculated average user ratings and average IMDb ratings of all the movies added to the watchlist by the user. The watchlist data is persisted to local storage, ensuring that the watchlist and summary of watched movies remain intact even after refreshing the app.

## Using the OMDb API

To use the OMDb API in this project, follow these steps:

1. Visit the [OMDb API website](https://www.omdbapi.com/apikey.aspx).
2. Sign up for a FREE account.
3. Provide your email to receive the API key.
4. Add the received API key to a `.env` file in the project's root folder using the following format:

   ```plaintext
   REACT_APP_API_KEY=api-key-string
   ```

## Getting Started

To run this project on your local machine, follow these steps:

### Clone the Repository

1. Open a terminal or command prompt on your local machine.

2. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/arijit-malakar/usepopcorn.git
   ```

### Install Dependencies

1. Navigate to the project directory:

   ```bash
   cd usepopcorn
   ```

2. Install the project dependencies using npm:

   ```bash
   npm install
   ```

### Running the Project

1. After installing the dependencies, start the development server by running the following command:

   ```bash
   npm start
   ```

2. Open a web browser and visit [http://localhost:3000](http://localhost:3000) to view the usePopcorn app.

Now you have the project running locally on your machine. Explore and enjoy the movie search and watchlist features! 🍿🎬

## Running Tests

The project includes test cases for all components using Jest and React Testing Library (RTL). To run the tests, use the following commands:

- Run tests:

  ```bash
  npm run test
  ```

- Generate a coverage report:
  ```bash
  npm run test:coverage
  ```
