import { useState } from "react";
import {
  Alert,
  Box,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Header } from "@/components/ui/Header";
import {
  CarFilterBar,
  CarList,
  CreateCarDialog,
  useCarFilters,
  useCars,
} from "@/features/cars";

export const CarsPage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const {
    modelSearch,
    selectedYear,
    sortBy,
    queryVariables,
    hasActiveFilters,
    setModelSearch,
    setSelectedYear,
    setSortBy,
    resetFilters,
    sortCars,
  } = useCarFilters();

  const { cars, loading, error, refetch } = useCars({
    variables: queryVariables,
  });

  const sortedCars = sortCars(cars);

  const handleCarCreated = () => {
    setSuccessSnackbar(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: { xs: 3, md: 5 }, flexGrow: 1 }}
      >
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Vehicle Inventory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse, filter, and inspect vehicles across available models and
            years.
          </Typography>
        </Stack>

        <CarFilterBar
          modelSearch={modelSearch}
          onModelSearchChange={setModelSearch}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          onOpenCreateDialog={() => setCreateDialogOpen(true)}
        />

        <CarList
          cars={sortedCars}
          loading={loading}
          error={error}
          refetch={refetch}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          onAddCar={() => setCreateDialogOpen(true)}
        />

        <CreateCarDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSuccess={handleCarCreated}
        />

        <Snackbar
          open={successSnackbar}
          autoHideDuration={4000}
          onClose={() => setSuccessSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSuccessSnackbar(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Vehicle added successfully to inventory!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};
