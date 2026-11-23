import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarsPage } from "@/pages/CarsPage";
import { CarDetailPage } from "@/pages/CarDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Brief } from "@/pages/Brief";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CarsPage />} />
      <Route path="/cars/:id" element={<CarDetailPage />} />
      <Route path="/brief" element={<Brief />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
