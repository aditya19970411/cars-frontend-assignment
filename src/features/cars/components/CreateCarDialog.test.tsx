import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateCarDialog } from "./CreateCarDialog";

const mockCreateCar = jest.fn();

jest.mock("../api/useCreateCar", () => ({
  useCreateCar: () => ({
    createCar: mockCreateCar,
    loading: false,
    error: null,
  }),
}));

describe("CreateCarDialog component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when open and shows form fields", () => {
    render(<CreateCarDialog open={true} onClose={jest.fn()} />);

    expect(screen.getByRole("dialog", { name: "Add New Car" })).toBeInTheDocument();
    expect(screen.getByLabelText(/make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
  });

  it("validates required fields on submit", async () => {
    const user = userEvent.setup();
    render(<CreateCarDialog open={true} onClose={jest.fn()} />);

    // Clear Make input
    const makeInput = screen.getByLabelText(/make/i);
    await user.clear(makeInput);

    // Click submit
    const submitBtn = screen.getByRole("button", { name: "Add Car" });
    await user.click(submitBtn);

    // Validation errors should be visible
    expect(screen.getByText("Make is required")).toBeInTheDocument();
    expect(screen.getByText("Model is required")).toBeInTheDocument();
    expect(screen.getByText("Color is required")).toBeInTheDocument();
    expect(mockCreateCar).not.toHaveBeenCalled();
  });

  it("submits valid form data", async () => {
    mockCreateCar.mockResolvedValueOnce({ id: "new-1" });
    const user = userEvent.setup();
    const handleClose = jest.fn();
    const handleSuccess = jest.fn();

    render(
      <CreateCarDialog
        open={true}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    );

    const modelInput = screen.getByLabelText(/model/i);
    await user.type(modelInput, "RS6 Avant");

    const colorInput = screen.getByLabelText(/color/i);
    await user.type(colorInput, "Nardo Grey");

    const submitBtn = screen.getByRole("button", { name: "Add Car" });
    await user.click(submitBtn);

    expect(mockCreateCar).toHaveBeenCalledWith(
      expect.objectContaining({
        make: "Audi",
        model: "RS6 Avant",
        color: "Nardo Grey",
      })
    );
    expect(handleSuccess).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(<CreateCarDialog open={true} onClose={handleClose} />);

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
