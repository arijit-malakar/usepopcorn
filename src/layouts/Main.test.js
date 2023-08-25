import { render, screen } from "@testing-library/react";
import Main from "./Main";

test("renders a nav element with child items", () => {
  render(
    <Main>
      <p>This is a child component</p>
    </Main>
  );

  const mainElement = screen.getByRole("main");
  const childElement = screen.getByText(/this is a child component/i);

  expect(mainElement).toBeInTheDocument();
  expect(childElement).toBeInTheDocument();
});
