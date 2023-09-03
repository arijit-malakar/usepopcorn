import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import Search from "./Search";

test("renders search field with a placeholder text", () => {
  render(<Search query="" setQuery={() => {}} />);

  const searchField = screen.getByPlaceholderText(/search movies/i);

  expect(searchField).toBeInTheDocument();
});

test("calls setQuery with the inputted text one character at a time", () => {
  const searchTerm = "Inception";
  const mockSetQuery = jest.fn();
  render(<Search query="" setQuery={mockSetQuery} />);

  const searchField = screen.getByPlaceholderText(/search movies/i);

  for (let i = 0; i < searchTerm.length; i++) {
    user.type(searchField, searchTerm[i]);
    expect(mockSetQuery).toHaveBeenCalledWith(searchTerm[i]);
  }
});

test("does not do anything when pressing Enter on the search field", () => {
  render(<Search query="" setQuery={() => {}} />);

  const searchField = screen.getByPlaceholderText(/search movies/i);
  searchField.focus();
  fireEvent.keyDown(document.body, { key: "Enter" });

  expect(searchField).toHaveFocus();
});

// test("clears input and focuses on the search field when Enter key is pressed", async () => {
//   const mockSetQuery = jest.fn();
//   render(<Search query="" setQuery={mockSetQuery} />);
//   const searchField = screen.getByPlaceholderText(/search movies/i);

//   // Simulate input into the search field
//   user.type(searchField, "Inception");

//   // Simulate focusing on another element (not the search field)
//   searchField.blur();

//   // Ensure the active element is not the search field
//   // eslint-disable-next-line testing-library/no-node-access
//   expect(document.activeElement).not.toBe(searchField);

//   // Simulate pressing the Enter key
//   // fireEvent.keyDown(document, { key: "Enter" });
//   user.type(document.body, "{enter}");

//   // Expect the input to be cleared and the search field to be focused
//   expect(mockSetQuery).toHaveBeenCalledWith(""); // Query should be cleared
//   expect(searchField).toHaveFocus();
//   await waitFor(() => {
//     expect(searchField).toHaveValue("");
//   });
// });
