import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { Car, GetCarsVariables, SortOption } from "../types";

export const SORT_OPTIONS: SortOption[] = [
  { value: "year-desc", label: "Year: Newest first", field: "year", order: "desc" },
  { value: "year-asc", label: "Year: Oldest first", field: "year", order: "asc" },
  { value: "model-asc", label: "Model: A to Z", field: "model", order: "asc" },
  { value: "model-desc", label: "Model: Z to A", field: "model", order: "desc" },
  { value: "make-asc", label: "Make: A to Z", field: "make", order: "asc" },
];

export interface UseCarFiltersOptions {
  initialModel?: string;
  initialYear?: number | null;
  initialSort?: string;
  debounceMs?: number;
}

export const useCarFilters = (options: UseCarFiltersOptions = {}) => {
  const {
    initialModel = "",
    initialYear = null,
    initialSort = "year-desc",
    debounceMs = 300,
  } = options;

  const [modelSearch, setModelSearch] = useState<string>(initialModel);
  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear);
  const [sortBy, setSortBy] = useState<string>(initialSort);

  const debouncedModel = useDebounce(modelSearch, debounceMs);

  // Server-side query variables passed to GetCars
  const queryVariables: GetCarsVariables = useMemo(() => {
    const vars: GetCarsVariables = {};
    const trimmedModel = debouncedModel.trim();
    if (trimmedModel) {
      vars.model = trimmedModel;
    }
    if (selectedYear != null) {
      vars.year = selectedYear;
    }
    return vars;
  }, [debouncedModel, selectedYear]);

  const hasActiveFilters = Boolean(modelSearch.trim() || selectedYear != null);

  const resetFilters = () => {
    setModelSearch("");
    setSelectedYear(null);
    setSortBy("year-desc");
  };

  // Client-side sorting function
  const sortCars = (cars: Car[]): Car[] => {
    const currentSort =
      SORT_OPTIONS.find((opt) => opt.value === sortBy) ?? SORT_OPTIONS[0];

    return [...cars].sort((a, b) => {
      let comparison = 0;
      if (currentSort.field === "year") {
        comparison = a.year - b.year;
      } else if (currentSort.field === "model") {
        comparison = a.model.localeCompare(b.model, undefined, { sensitivity: "base" });
      } else if (currentSort.field === "make") {
        comparison = a.make.localeCompare(b.make, undefined, { sensitivity: "base" });
      }

      return currentSort.order === "asc" ? comparison : -comparison;
    });
  };

  return {
    modelSearch,
    debouncedModel,
    selectedYear,
    sortBy,
    queryVariables,
    hasActiveFilters,
    setModelSearch,
    setSelectedYear,
    setSortBy,
    resetFilters,
    sortCars,
  };
};
