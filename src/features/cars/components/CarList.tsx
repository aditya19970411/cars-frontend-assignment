import { Box, Typography } from "@mui/material";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Car } from "../types";
import { CarCard } from "./CarCard";
import { CarCardSkeleton } from "./CarCardSkeleton";

export interface CarListProps {
  cars: Car[];
  loading: boolean;
  error?: Error | null;
  refetch?: () => void;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  onAddCar?: () => void;
}

export const CarList = ({
  cars,
  loading,
  error,
  refetch,
  hasActiveFilters = false,
  onResetFilters,
  onAddCar,
}: CarListProps) => {
  if (error) {
    return (
      <ErrorAlert
        title="Failed to load cars"
        message={error.message || "An error occurred while fetching cars from the server."}
        onRetry={refetch ? () => { void refetch(); } : undefined}
      />
    );
  }

  if (loading && cars.length === 0) {
    return (
      <Box
        data-testid="car-list-loading"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <CarCardSkeleton key={idx} />
        ))}
      </Box>
    );
  }

  if (cars.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          title="No cars match your search"
          description="Try adjusting or clearing your search filters to find what you are looking for."
          actionLabel="Clear filters"
          onAction={onResetFilters}
        />
      );
    }

    return (
      <EmptyState
        title="No cars in inventory"
        description="Your inventory is currently empty. Add your first vehicle to get started."
        actionLabel="Add car"
        onAction={onAddCar}
      />
    );
  }

  return (
    <Box component="section" aria-label="Car inventory list">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          aria-live="polite"
          data-testid="car-count"
        >
          {loading ? "Updating..." : `Showing ${cars.length} ${cars.length === 1 ? "car" : "cars"}`}
        </Typography>
      </Box>

      <Box
        data-testid="car-grid"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </Box>
    </Box>
  );
};
