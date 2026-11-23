import { render, screen } from "@testing-library/react";
import { CarImage } from "./CarImage";

describe("CarImage component", () => {
  const defaultProps = {
    mobile: "/images/q5-mobile.svg",
    tablet: "/images/q5-tablet.svg",
    desktop: "/images/q5-desktop.svg",
    alt: "Audi Q5",
  };

  it("renders a picture element with correct media queries and sources", () => {
    render(<CarImage {...defaultProps} />);

    const picture = screen.getByTestId("car-picture");
    expect(picture).toBeInTheDocument();

    const desktopSource = screen.getByTestId("car-source-desktop");
    expect(desktopSource).toHaveAttribute("media", "(min-width: 1024px)");
    expect(desktopSource).toHaveAttribute("srcset", "/images/q5-desktop.svg");

    const tabletSource = screen.getByTestId("car-source-tablet");
    expect(tabletSource).toHaveAttribute("media", "(min-width: 640px)");
    expect(tabletSource).toHaveAttribute("srcset", "/images/q5-tablet.svg");

    const img = screen.getByTestId("car-img");
    expect(img).toHaveAttribute("src", "/images/q5-mobile.svg");
    expect(img).toHaveAttribute("alt", "Audi Q5");
  });
});
