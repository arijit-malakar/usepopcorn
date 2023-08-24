import { render, screen } from "@testing-library/react";
import NavBar from "./Navbar";

test("renders a nav element with child items", () => {
  render(
    <NavBar>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </NavBar>
  );

  const navElement = screen.getByRole("navigation");
  const childItems = screen.getAllByRole("link");

  expect(navElement).toBeInTheDocument();
  expect(childItems).toHaveLength(3);
});
