import { render, screen, fireEvent } from "@testing-library/react";
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
