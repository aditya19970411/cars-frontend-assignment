export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface CreateCarInput {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

export interface GetCarsVariables {
  make?: string | null;
  model?: string | null;
  year?: number | null;
  color?: string | null;
}

export interface GetCarsData {
  cars: Car[];
}

export interface GetCarVariables {
  id: string;
}

export interface GetCarData {
  car: Car | null;
}

export interface CreateCarVariables {
  input: CreateCarInput;
}

export interface CreateCarData {
  createCar: Car;
}

export type SortField = "year" | "model" | "make";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: string;
  label: string;
  field: SortField;
  order: SortOrder;
}
