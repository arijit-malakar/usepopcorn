import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

test("renders a logo image and caption", () => {
  render(<Logo />);

  const logoImage = screen.getByRole("img", { name: "logo-image" });
  const logoCaption = screen.getByRole("heading", {
    name: /usepopcorn/i,
  });

  expect(logoImage).toBeInTheDocument();
  expect(logoCaption).toBeInTheDocument();
});
