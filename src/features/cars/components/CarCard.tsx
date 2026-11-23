import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Car } from "../types";
import { CarImage } from "./CarImage";

export interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/cars/${car.id}`}
        aria-label={`View details for ${car.year} ${car.make} ${car.model}`}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <CarImage
          mobile={car.mobile}
          tablet={car.tablet}
          desktop={car.desktop}
          alt={`${car.make} ${car.model}`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: 600, letterSpacing: 0.5 }}
          >
            {car.make}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1.5 }}
          >
            {car.model}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label={car.year}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip
              label={car.color}
              size="small"
              variant="filled"
              sx={{ backgroundColor: "grey.100" }}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
