import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Star from "./Star";

test("renders a full star when full prop is true", () => {
  render(<Star full={true} />);

  const fullStar = screen.getByRole("button");

  expect(fullStar).toBeInTheDocument();
  expect(fullStar).toContainHTML(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"'
  );
});

test("renders an blank star when full prop is false", () => {
  render(<Star full={false} />);

  const blankStar = screen.getByRole("button");

  expect(blankStar).toBeInTheDocument();
  expect(blankStar).toContainHTML(
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"'
  );
});

test("calls onRate handler on clicking a star", () => {
  const mockOnRate = jest.fn();
  render(<Star full={true} onRate={mockOnRate} />);

  const fullStar = screen.getByRole("button");
  user.click(fullStar);

  expect(mockOnRate).toHaveBeenCalled();
});

test("calls onHoverIn and onHoverOut handlers for mouse entering and leaving the star respectively", () => {
  const mockOnHoverIn = jest.fn();
  const mockOnHoverOut = jest.fn();
  render(
    <Star full={true} onHoverIn={mockOnHoverIn} onHoverOut={mockOnHoverOut} />
  );

  const fullStar = screen.getByRole("button");

  user.hover(fullStar);
  expect(mockOnHoverIn).toHaveBeenCalled();

  user.unhover(fullStar);
  expect(mockOnHoverOut).toHaveBeenCalled();
});

test("renders a full star of blue color and size 24", () => {
  const color = "blue";
  const size = 24;
  render(<Star full={true} color={color} size={size} />);

  const star = screen.getByRole("button");
  // eslint-disable-next-line testing-library/no-node-access
  const svg = star.querySelector("svg");

  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute("fill", color);
  expect(star).toHaveStyle(`width: ${size}px`);
  expect(star).toHaveStyle(`height: ${size}px`);
});
