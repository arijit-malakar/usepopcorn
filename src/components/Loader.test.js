import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders loading text", () => {
  render(<Loader />);

  const loadingText = screen.getByText(/loading/i);

  expect(loadingText).toBeInTheDocument();
});
