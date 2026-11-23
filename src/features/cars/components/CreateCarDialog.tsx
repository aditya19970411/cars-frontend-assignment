import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useCreateCar } from "../api/useCreateCar";
import type { CreateCarInput } from "../types";

export interface CreateCarDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DEFAULT_IMAGE_PRESETS = [
  { label: "Audi Q5 placeholder", slug: "q5" },
  { label: "Audi A3 placeholder", slug: "a3" },
  { label: "Audi R8 placeholder", slug: "r8" },
  { label: "Audi e-tron GT placeholder", slug: "etron" },
  { label: "Audi A6 placeholder", slug: "a6" },
  { label: "Audi Q3 placeholder", slug: "q3" },
];

export const CreateCarDialog = ({
  open,
  onClose,
  onSuccess,
}: CreateCarDialogProps) => {
  const { createCar, loading, error: apolloError } = useCreateCar();

  const [make, setMake] = useState("Audi");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">(new Date().getFullYear());
  const [color, setColor] = useState("");
  const [imageSlug, setImageSlug] = useState("q5");

  const [fieldErrors, setFieldErrors] = useState<{
    make?: string;
    model?: string;
    year?: string;
    color?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = () => {
    setMake("Audi");
    setModel("");
    setYear(new Date().getFullYear());
    setColor("");
    setImageSlug("q5");
    setFieldErrors({});
    setSubmitError(null);
  };

  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const errors: {
      make?: string;
      model?: string;
      year?: string;
      color?: string;
    } = {};

    if (!make.trim()) {
      errors.make = "Make is required";
    }
    if (!model.trim()) {
      errors.model = "Model is required";
    }
    if (!year || isNaN(Number(year)) || Number(year) < 1900 || Number(year) > 2100) {
      errors.year = "Enter a valid year between 1900 and 2100";
    }
    if (!color.trim()) {
      errors.color = "Color is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    const input: CreateCarInput = {
      make: make.trim(),
      model: model.trim(),
      year: Number(year),
      color: color.trim(),
      mobile: `/images/${imageSlug}-mobile.svg`,
      tablet: `/images/${imageSlug}-tablet.svg`,
      desktop: `/images/${imageSlug}-desktop.svg`,
    };

    try {
      await createCar(input);
      resetForm();
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create car";
      setSubmitError(message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="create-car-dialog-title"
    >
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle id="create-car-dialog-title">Add New Car</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Fill in the vehicle specifications to add it to the inventory.
          </DialogContentText>

          {(submitError || apolloError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError || apolloError?.message}
            </Alert>
          )}

          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              id="car-make-input"
              label="Make"
              required
              fullWidth
              value={make}
              onChange={(e) => setMake(e.target.value)}
              error={Boolean(fieldErrors.make)}
              helperText={fieldErrors.make}
              autoFocus
            />

            <TextField
              id="car-model-input"
              label="Model"
              required
              fullWidth
              value={model}
              onChange={(e) => setModel(e.target.value)}
              error={Boolean(fieldErrors.model)}
              helperText={fieldErrors.model}
              placeholder="e.g. RS6 Avant, Q7, TT"
            />

            <TextField
              id="car-year-input"
              label="Year"
              type="number"
              required
              fullWidth
              value={year}
              onChange={(e) =>
                setYear(e.target.value === "" ? "" : Number(e.target.value))
              }
              error={Boolean(fieldErrors.year)}
              helperText={fieldErrors.year}
              slotProps={{
                htmlInput: { min: 1900, max: 2100 },
              }}
            />

            <TextField
              id="car-color-input"
              label="Color"
              required
              fullWidth
              value={color}
              onChange={(e) => setColor(e.target.value)}
              error={Boolean(fieldErrors.color)}
              helperText={fieldErrors.color}
              placeholder="e.g. Daytona Grey, Mythos Black"
            />

            <FormControl fullWidth>
              <InputLabel id="car-image-preset-label">Image preset</InputLabel>
              <Select
                labelId="car-image-preset-label"
                id="car-image-preset"
                value={imageSlug}
                label="Image preset"
                onChange={(e) => setImageSlug(e.target.value)}
              >
                {DEFAULT_IMAGE_PRESETS.map((preset) => (
                  <MenuItem key={preset.slug} value={preset.slug}>
                    {preset.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleClose} disabled={loading} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={16} color="inherit" /> : null
            }
          >
            {loading ? "Adding..." : "Add Car"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
