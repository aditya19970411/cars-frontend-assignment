import { useQuery, type QueryResult } from "@apollo/client";
import { GET_CARS } from "./queries";
import type { Car, GetCarsData, GetCarsVariables } from "../types";

export interface UseCarsOptions {
  variables?: GetCarsVariables;
  skip?: boolean;
}

export interface UseCarsResult {
  cars: Car[];
  loading: boolean;
  error: QueryResult<GetCarsData, GetCarsVariables>["error"];
  refetch: QueryResult<GetCarsData, GetCarsVariables>["refetch"];
  networkStatus: QueryResult<GetCarsData, GetCarsVariables>["networkStatus"];
}

export const useCars = (options?: UseCarsOptions): UseCarsResult => {
  const { data, loading, error, refetch, networkStatus } = useQuery<
    GetCarsData,
    GetCarsVariables
  >(GET_CARS, {
    variables: options?.variables,
    skip: options?.skip,
    notifyOnNetworkStatusChange: true,
  });

  return {
    cars: data?.cars ?? [],
    loading,
    error,
    refetch,
    networkStatus,
  };
};
