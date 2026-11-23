import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { SORT_OPTIONS } from "../hooks/useCarFilters";

export interface CarFilterBarProps {
  modelSearch: string;
  onModelSearchChange: (value: string) => void;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  availableYears?: number[];
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onOpenCreateDialog: () => void;
}

export const CarFilterBar = ({
  modelSearch,
  onModelSearchChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortByChange,
  availableYears = [2025, 2024, 2023, 2022, 2021],
  hasActiveFilters,
  onResetFilters,
  onOpenCreateDialog,
}: CarFilterBarProps) => {
  return (
    <Paper
      component="section"
      aria-label="Car search and filter options"
      variant="outlined"
      sx={{
        p: 2.5,
        mb: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {/* Model Search with Debounce */}
          <TextField
            id="car-search-model"
            label="Search model"
            placeholder="e.g. Q5, A3, e-tron"
            size="small"
            value={modelSearch}
            onChange={(e) => onModelSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: modelSearch ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear model search"
                      size="small"
                      onClick={() => onModelSearchChange("")}
                      edge="end"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{ minWidth: { xs: "100%", sm: 220 } }}
          />

          {/* Year Filter */}
          <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 } }}>
            <InputLabel id="car-filter-year-label">Year</InputLabel>
            <Select
              labelId="car-filter-year-label"
              id="car-filter-year"
              label="Year"
              value={selectedYear ?? ""}
              onChange={(e) => {
                const val = e.target.value as string | number;
                onYearChange(val === "" ? null : Number(val));
              }}
            >
              <MenuItem value="">
                <em>All years</em>
              </MenuItem>
              {availableYears.map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort Control */}
          <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 190 } }}>
            <InputLabel id="car-sort-label">Sort by</InputLabel>
            <Select
              labelId="car-sort-label"
              id="car-sort"
              label="Sort by"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Tooltip title="Reset all search & filters">
              <Button
                variant="text"
                size="small"
                startIcon={<RestartAltIcon />}
                onClick={onResetFilters}
                sx={{ textTransform: "none" }}
              >
                Reset
              </Button>
            </Tooltip>
          )}
        </Box>

        {/* Add Car Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onOpenCreateDialog}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Add Car
        </Button>
      </Box>
    </Paper>
  );
};
