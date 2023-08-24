import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

const message = "Error!!";

test("shows ⛔️ icon with the message", () => {
  render(<ErrorMessage message={message} />);

  const errorIcon = screen.getByText("⛔️");
  const errorMessage = screen.getByText(message);

  expect(errorIcon).toBeInTheDocument();
  expect(errorMessage).toBeInTheDocument();
});
