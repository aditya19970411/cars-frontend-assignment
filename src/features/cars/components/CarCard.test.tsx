import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CarCard } from "./CarCard";
import type { Car } from "../types";

const mockCar: Car = {
  id: "car-123",
  make: "Audi",
  model: "RS6",
  year: 2024,
  color: "Nardo Grey",
  mobile: "/images/rs6-mobile.svg",
  tablet: "/images/rs6-tablet.svg",
  desktop: "/images/rs6-desktop.svg",
};

describe("CarCard component", () => {
  it("renders car information and accessible link to detail page", () => {
    render(
      <MemoryRouter>
        <CarCard car={mockCar} />
      </MemoryRouter>
    );

    expect(screen.getByText("Audi")).toBeInTheDocument();
    expect(screen.getByText("RS6")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Nardo Grey")).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: /view details for 2024 audi rs6/i,
    });
    expect(link).toHaveAttribute("href", "/cars/car-123");
  });
});
