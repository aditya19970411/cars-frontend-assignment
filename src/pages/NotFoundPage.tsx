import { Box, Button, Container, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Link as RouterLink } from "react-router-dom";
import { Header } from "@/components/ui/Header";

export const NotFoundPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          py: 8,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <DirectionsCarIcon sx={{ fontSize: 64, color: "text.secondary" }} />
        <Typography variant="h3" component="h1" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Back to Inventory
        </Button>
      </Container>
    </Box>
  );
};
