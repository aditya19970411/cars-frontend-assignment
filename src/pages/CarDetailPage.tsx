import { Box } from "@mui/material";
import { Header } from "@/components/ui/Header";
import { CarDetail } from "@/features/cars";

export const CarDetailPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <CarDetail />
      </Box>
    </Box>
  );
};
