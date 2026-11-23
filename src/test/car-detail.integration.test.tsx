import {
  createTestApolloClient,
  renderWithProviders,
  screen,
  waitFor,
} from "./renderWithProviders";
import { Route, Routes } from "react-router-dom";
import { graphql, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { db } from "@/mocks/db";
import { CarDetailPage } from "@/pages/CarDetailPage";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  db.reset();
});
afterAll(() => server.close());

describe("CarDetailPage integration", () => {
  it("fetches and renders car details by id", async () => {
    const client = createTestApolloClient();
    renderWithProviders(
      <Routes>
        <Route path="/cars/:id" element={<CarDetailPage />} />
      </Routes>,
      {
        initialEntries: ["/cars/1"],
        client,
      }
    );

    // Shows loading skeleton
    expect(screen.getByTestId("car-detail-loading")).toBeInTheDocument();

    // Loads car details for Audi Q5
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Q5");
    });

    expect(
      screen.getAllByText("Glacier White").length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("2023").length
    ).toBeGreaterThanOrEqual(1);

    // Responsive image is rendered with all sources
    expect(screen.getByTestId("car-source-desktop")).toHaveAttribute(
      "srcset",
      "/images/q5-desktop.svg"
    );
    expect(screen.getByTestId("car-source-tablet")).toHaveAttribute(
      "srcset",
      "/images/q5-tablet.svg"
    );
    expect(screen.getByTestId("car-img")).toHaveAttribute(
      "src",
      "/images/q5-mobile.svg"
    );
  });

  it("displays not found state when car ID does not exist", async () => {
    const client = createTestApolloClient();
    renderWithProviders(
      <Routes>
        <Route path="/cars/:id" element={<CarDetailPage />} />
      </Routes>,
      {
        initialEntries: ["/cars/9999"],
        client,
      }
    );

    await waitFor(() => {
      expect(screen.getByText("Car not found")).toBeInTheDocument();
    });
  });

  it("displays error alert when GetCar query fails", async () => {
    server.use(
      graphql.query("GetCar", () =>
        HttpResponse.json({ errors: [{ message: "Database timeout" }] })
      )
    );

    const client = createTestApolloClient();
    renderWithProviders(
      <Routes>
        <Route path="/cars/:id" element={<CarDetailPage />} />
      </Routes>,
      {
        initialEntries: ["/cars/1"],
        client,
      }
    );

    await waitFor(() => {
      expect(
        screen.getByText("Could not load car details")
      ).toBeInTheDocument();
      expect(screen.getByText(/Database timeout/i)).toBeInTheDocument();
    });
  });
});
