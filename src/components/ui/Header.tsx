import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static" color="inherit" elevation={1} component="header">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "text.primary",
            }}
          >
            <DirectionsCarIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, letterSpacing: -0.5 }}
            >
              Car Inventory
            </Typography>
          </Box>

          <Box component="nav" sx={{ display: "flex", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Inventory
            </Button>
            <Button
              component={RouterLink}
              to="/brief"
              color="inherit"
              size="small"
              startIcon={<AssignmentIcon />}
              sx={{ textTransform: "none" }}
            >
              Brief
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
