import { render, screen, fireEvent } from "@testing-library/react";
import Box from "./Box";

function renderComponent() {
  render(
    <Box>
      <p>Child component</p>
    </Box>
  );
}

test("shows a box having children with – button", () => {
  renderComponent();

  const children = screen.getByText("Child component");
  const button = screen.getByRole("button", {
    name: "–",
  });

  expect(children).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("hides the children items and changes button value to +, if – is pressed", () => {
  renderComponent();

  const button = screen.getByRole("button", {
    name: "–",
  });

  fireEvent.click(button);

  expect(screen.queryByText("Child component")).not.toBeInTheDocument();
  expect(button).toHaveTextContent("+");
});

test("shows the children items and changes button value to –, if + is pressed", () => {
  renderComponent();

  const button = screen.getByRole("button", {
    name: "–",
  });
  fireEvent.click(button);
  expect(screen.queryByText("Child component")).not.toBeInTheDocument();
  expect(button).toHaveTextContent("+");

  fireEvent.click(button);
  expect(screen.getByText("Child component")).toBeInTheDocument();
  expect(button).toHaveTextContent("–");
});
