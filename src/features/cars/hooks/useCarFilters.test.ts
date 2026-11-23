import { renderHook, act } from "@testing-library/react";
import { useCarFilters } from "./useCarFilters";
import type { Car } from "../types";

const mockCars: Car[] = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "White",
    mobile: "m1",
    tablet: "t1",
    desktop: "d1",
  },
  {
    id: "2",
    make: "Audi",
    model: "A3",
    year: 2021,
    color: "Red",
    mobile: "m2",
    tablet: "t2",
    desktop: "d2",
  },
  {
    id: "3",
    make: "BMW",
    model: "M3",
    year: 2024,
    color: "Black",
    mobile: "m3",
    tablet: "t3",
    desktop: "d3",
  },
];

describe("useCarFilters hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useCarFilters());
    expect(result.current.modelSearch).toBe("");
    expect(result.current.debouncedModel).toBe("");
    expect(result.current.selectedYear).toBeNull();
    expect(result.current.sortBy).toBe("year-desc");
    expect(result.current.queryVariables).toEqual({});
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("updates model search and debounces queryVariables", () => {
    const { result } = renderHook(() => useCarFilters({ debounceMs: 300 }));

    act(() => {
      result.current.setModelSearch("Q5");
    });
    expect(result.current.modelSearch).toBe("Q5");
    expect(result.current.hasActiveFilters).toBe(true);
    expect(result.current.queryVariables.model).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current.debouncedModel).toBe("Q5");
    expect(result.current.queryVariables.model).toBe("Q5");
  });

  it("updates year filter and includes it in queryVariables", () => {
    const { result } = renderHook(() => useCarFilters());

    act(() => {
      result.current.setSelectedYear(2023);
    });
    expect(result.current.selectedYear).toBe(2023);
    expect(result.current.queryVariables.year).toBe(2023);
  });

  it("sorts cars correctly according to selected criteria", () => {
    const { result } = renderHook(() => useCarFilters());

    // Default: year-desc
    let sorted = result.current.sortCars(mockCars);
    expect(sorted.map((c) => c.year)).toEqual([2024, 2023, 2021]);

    // Year asc
    act(() => {
      result.current.setSortBy("year-asc");
    });
    sorted = result.current.sortCars(mockCars);
    expect(sorted.map((c) => c.year)).toEqual([2021, 2023, 2024]);

    // Model asc
    act(() => {
      result.current.setSortBy("model-asc");
    });
    sorted = result.current.sortCars(mockCars);
    expect(sorted.map((c) => c.model)).toEqual(["A3", "M3", "Q5"]);

    // Model desc
    act(() => {
      result.current.setSortBy("model-desc");
    });
    sorted = result.current.sortCars(mockCars);
    expect(sorted.map((c) => c.model)).toEqual(["Q5", "M3", "A3"]);

    // Make asc
    act(() => {
      result.current.setSortBy("make-asc");
    });
    sorted = result.current.sortCars(mockCars);
    expect(sorted.map((c) => c.make)).toEqual(["Audi", "Audi", "BMW"]);
  });

  it("resets all filters when resetFilters is called", () => {
    const { result } = renderHook(() => useCarFilters());

    act(() => {
      result.current.setModelSearch("Test");
      result.current.setSelectedYear(2024);
      result.current.setSortBy("model-asc");
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.modelSearch).toBe("");
    expect(result.current.selectedYear).toBeNull();
    expect(result.current.sortBy).toBe("year-desc");
  });
});
