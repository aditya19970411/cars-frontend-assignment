import {
  createTestApolloClient,
  renderWithProviders,
  screen,
  waitFor,
  within,
} from "./renderWithProviders";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { db } from "@/mocks/db";
import { CarsPage } from "@/pages/CarsPage";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  db.reset();
});
afterAll(() => server.close());

describe("CarsPage integration", () => {
  it("loads and displays all seed cars from the mock API", async () => {
    const client = createTestApolloClient();
    renderWithProviders(<CarsPage />, { client });

    // Initially shows loading skeleton or indicator
    expect(screen.getByTestId("car-list-loading")).toBeInTheDocument();

    // After loading, all 6 cars are displayed
    await waitFor(() => {
      expect(screen.getByText("Showing 6 cars")).toBeInTheDocument();
    });

    expect(screen.getByText("Q5")).toBeInTheDocument();
    expect(screen.getByText("A3")).toBeInTheDocument();
    expect(screen.getByText("R8")).toBeInTheDocument();
    expect(screen.getByText("e-tron GT")).toBeInTheDocument();
    expect(screen.getByText("A6")).toBeInTheDocument();
    expect(screen.getByText("Q3")).toBeInTheDocument();
  });

  it("filters cars by model with server-side variables", async () => {
    const client = createTestApolloClient();
    const user = userEvent.setup();
    renderWithProviders(<CarsPage />, { client });

    await waitFor(() => {
      expect(screen.getByText("Showing 6 cars")).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText("Search model");
    await user.type(searchInput, "Q5");

    // Debounce + server query
    await waitFor(
      () => {
        expect(screen.getByText("Showing 1 car")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("Q5")).toBeInTheDocument();
    expect(screen.queryByText("A3")).not.toBeInTheDocument();
  });

  it("filters cars by year with server-side variables", async () => {
    const client = createTestApolloClient();
    const user = userEvent.setup();
    renderWithProviders(<CarsPage />, { client });

    await waitFor(() => {
      expect(screen.getByText("Showing 6 cars")).toBeInTheDocument();
    });

    // Open year select
    const yearSelect = screen.getByLabelText("Year");
    await user.click(yearSelect);

    const yearOption = await screen.findByRole("option", { name: "2025" });
    await user.click(yearOption);

    await waitFor(() => {
      expect(screen.getByText("Showing 1 car")).toBeInTheDocument();
    });

    expect(screen.getByText("e-tron GT")).toBeInTheDocument();
  });

  it("displays empty state when no cars match and resets on action", async () => {
    const client = createTestApolloClient();
    const user = userEvent.setup();
    renderWithProviders(<CarsPage />, { client });

    await waitFor(() => {
      expect(screen.getByText("Showing 6 cars")).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText("Search model");
    await user.type(searchInput, "NonExistentModel123");

    await waitFor(
      () => {
        expect(
          screen.getByText("No cars match your search")
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const clearButton = screen.getByRole("button", { name: "Clear filters" });
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText("Showing 6 cars")).toBeInTheDocument();
    });
  });

  it("displays error alert when GetCars query fails", async () => {
    server.use(
      graphql.query("GetCars", () =>
        HttpResponse.json({ errors: [{ message: "Server connection failed" }] })
      )
    );

    const client = createTestApolloClient();
    renderWithProviders(<CarsPage />, { client });

    await waitFor(() => {
      expect(screen.getByText("Failed to load cars")).toBeInTheDocument();
      expect(
        screen.getByText(/Server connection failed/i)
      ).toBeInTheDocument();
    });
  });

  it("creates a new car via CreateCar mutation and updates cache immediately", async () => {
    const client = createTestApolloClient();
    const user = userEvent.setup();
    renderWithProviders(<CarsPage />, { client });

    await waitFor(() => {
      expect(screen.getByText("Showing 6 cars")).toBeInTheDocument();
    });

    // Open Add Car dialog
    const addCarButton = screen.getByRole("button", { name: /add car/i });
    await user.click(addCarButton);

    const dialog = screen.getByRole("dialog", { name: "Add New Car" });
    expect(dialog).toBeInTheDocument();

    // Fill form inside dialog
    const modelInput = within(dialog).getByLabelText(/model/i);
    await user.type(modelInput, "RS7 Sportback");

    const colorInput = within(dialog).getByLabelText(/color/i);
    await user.type(colorInput, "Sebring Black");

    // Submit form
    const submitBtn = within(dialog).getByRole("button", { name: "Add Car" });
    await user.click(submitBtn);

    // List reflects the new car
    await waitFor(
      () => {
        expect(screen.getByText("Showing 7 cars")).toBeInTheDocument();
      },
      { timeout: 4000 }
    );

    expect(screen.getByText("RS7 Sportback")).toBeInTheDocument();
    expect(screen.getByText("Sebring Black")).toBeInTheDocument();
  });
});
