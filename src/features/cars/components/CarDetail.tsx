import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useCar } from "../api/useCar";
import { CarImage } from "./CarImage";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { EmptyState } from "@/components/ui/EmptyState";

export const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { car, loading, error, refetch } = useCar(id);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }} data-testid="car-detail-loading">
        <Skeleton variant="text" width={140} height={32} sx={{ mb: 2 }} />
        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ aspectRatio: "16 / 9" }}
            animation="wave"
          />
          <CardContent sx={{ p: 4 }}>
            <Skeleton variant="text" width="30%" height={24} />
            <Skeleton variant="text" width="60%" height={48} sx={{ mb: 3 }} />
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={100} height={32} />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2, textTransform: "none" }}
        >
          Back to inventory
        </Button>
        <ErrorAlert
          title="Could not load car details"
          message={error.message || "An unexpected error occurred."}
          onRetry={refetch ? () => { void refetch(); } : undefined}
        />
      </Container>
    );
  }

  if (!car) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <EmptyState
          title="Car not found"
          description="We couldn't find a vehicle matching the requested ID."
          actionLabel="Back to inventory"
          onAction={() => window.history.back()}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            component={RouterLink}
            to="/"
            size="small"
            color="inherit"
            sx={{ p: 0, minWidth: 0, textTransform: "none" }}
          >
            Inventory
          </Button>
          <Typography color="text.primary">
            {car.make} {car.model}
          </Typography>
        </Breadcrumbs>

        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ alignSelf: "flex-start", textTransform: "none" }}
        >
          Back to inventory
        </Button>
      </Stack>

      <Card
        component="article"
        variant="outlined"
        sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}
      >
        <CarImage
          mobile={car.mobile}
          tablet={car.tablet}
          desktop={car.desktop}
          alt={`${car.make} ${car.model}`}
          priority
          aspectRatio="16 / 9"
        />

        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              >
                {car.make}
              </Typography>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                {car.model}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Chip
                label={car.year}
                color="primary"
                size="medium"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={car.color}
                size="medium"
                sx={{ backgroundColor: "grey.100", fontWeight: 500 }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Vehicle Specifications
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Make
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {car.make}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Model
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {car.model}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Year
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {car.year}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Color
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {car.color}
              </Typography>
            </Paper>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mt: 3,
              borderRadius: 2,
              backgroundColor: "info.50",
              borderColor: "info.200",
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <InfoOutlinedIcon color="info" fontSize="small" sx={{ mt: 0.25 }} />
            <Box>
              <Typography variant="subtitle2" color="info.main">
                Responsive Image Breakpoints
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Resize your browser window to verify responsive images: Mobile
                (≤639px), Tablet (640–1023px), Desktop (≥1024px).
              </Typography>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};
