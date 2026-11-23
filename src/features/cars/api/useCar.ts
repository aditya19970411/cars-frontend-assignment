import { useQuery, type QueryResult } from "@apollo/client";
import { GET_CAR } from "./queries";
import type { Car, GetCarData, GetCarVariables } from "../types";

export interface UseCarResult {
  car: Car | null;
  loading: boolean;
  error: QueryResult<GetCarData, GetCarVariables>["error"];
  refetch: QueryResult<GetCarData, GetCarVariables>["refetch"];
}

export const useCar = (id: string | undefined): UseCarResult => {
  const { data, loading, error, refetch } = useQuery<
    GetCarData,
    GetCarVariables
  >(GET_CAR, {
    variables: { id: id ?? "" },
    skip: !id,
    notifyOnNetworkStatusChange: true,
  });

  return {
    car: data?.car ?? null,
    loading: !id ? false : loading,
    error,
    refetch,
  };
};
