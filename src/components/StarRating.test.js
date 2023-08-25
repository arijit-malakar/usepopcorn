import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import StarRating from "./StarRating";

test("renders 10 blank stars, having red outline color and size of 30px", () => {
  const maxRating = 10;
  const color = "red";
  const size = 30;
  render(<StarRating maxRating={maxRating} color={color} size={size} />);

  const stars = screen.getAllByRole("button");

  expect(stars).toHaveLength(10);
  stars.forEach((star) => {
    // eslint-disable-next-line testing-library/no-node-access
    const starSvg = star.querySelector("svg");
    expect(starSvg).toHaveAttribute("stroke", color);
    expect(starSvg).toHaveAttribute("fill", "none");
    expect(star).toHaveStyle({
      width: `${size}px`,
      height: `${size}px`,
    });
  });
});

test("renders initial defaultRating and the correct number of filled stars", () => {
  const defaultRating = 3;
  const color = "red";
  render(<StarRating defaultRating={defaultRating} color={color} />);

  const ratingText = screen.getByText(`${defaultRating}`);
  const filledStars = screen
    .getAllByRole("button")
    // eslint-disable-next-line testing-library/no-node-access
    .map((button) => button.querySelector("svg"))
    .filter((svg) => svg.getAttribute("fill") === `${color}`);

  expect(ratingText).toBeInTheDocument();
  expect(filledStars).toHaveLength(defaultRating);
});

test("shows a rating of 4 on clicking the 4th star", () => {
  const mockOnClick = jest.fn();
  render(<StarRating onSetRating={mockOnClick} />);

  const clickedStar = screen.getAllByRole("button")[3];
  fireEvent.click(clickedStar);
  const displayedRating = screen.getByText("4");

  expect(mockOnClick).toHaveBeenCalledWith(4);
  expect(displayedRating).toBeInTheDocument();
});

test("shows a temporary rating of 2 on hovering in the 2nd star", () => {
  render(<StarRating />);

  const hoveredInStar = screen.getAllByRole("button")[1];
  fireEvent.mouseEnter(hoveredInStar);
  const displayedRating = screen.getByText("2");

  expect(displayedRating).toBeInTheDocument();
});

test("resets temporary rating on hovering out from a star", () => {
  render(<StarRating />);

  const star = screen.getAllByRole("button")[2];
  fireEvent.mouseEnter(star);
  fireEvent.mouseLeave(star);
  const tempRating = screen.queryByText("3");

  expect(tempRating).not.toBeInTheDocument();
});

test("displays messages when hovered on a star", () => {
  const messages = ["Poor", "Fair", "Good", "Great", "Excellent"];
  render(<StarRating messages={messages} maxRating={5} />);

  const thirdStar = screen.getAllByRole("button")[2];
  fireEvent.mouseEnter(thirdStar);
  const displayedMessage = screen.getByText("Good");

  expect(displayedMessage).toBeInTheDocument();
});
