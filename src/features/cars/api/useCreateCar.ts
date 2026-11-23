import {
  gql,
  useMutation,
  type Reference,
  type StoreObject,
} from "@apollo/client";
import { CREATE_CAR } from "./queries";
import type {
  Car,
  CreateCarData,
  CreateCarInput,
  CreateCarVariables,
} from "../types";

const CAR_FRAGMENT = gql`
  fragment NewCarFragment on Car {
    id
    make
    model
    year
    color
    mobile
    tablet
    desktop
  }
`;

export const useCreateCar = () => {
  const [createCarMutation, { loading, error, data }] = useMutation<
    CreateCarData,
    CreateCarVariables
  >(CREATE_CAR, {
    refetchQueries: ["GetCars"],
    update(cache, { data: mutationData }) {
      if (!mutationData?.createCar) return;
      const newCar = mutationData.createCar;
      const carWithTypename = {
        __typename: "Car",
        ...newCar,
      };

      // Write fragment so the new car entity is properly normalized in cache
      cache.writeFragment({
        data: carWithTypename,
        fragment: CAR_FRAGMENT,
      });

      // Update cars queries in the Apollo InMemoryCache directly
      cache.modify({
        fields: {
          cars(existingCarRefs = [], { toReference, readField }) {
            const list = Array.isArray(existingCarRefs)
              ? (existingCarRefs as readonly (Reference | StoreObject)[])
              : [];
            const newCarRef = toReference(
              carWithTypename as unknown as StoreObject
            );
            if (!newCarRef) return existingCarRefs;

            const alreadyExists = list.some(
              (ref) => readField("id", ref) === newCar.id
            );
            if (alreadyExists) return existingCarRefs;

            return [newCarRef, ...list];
          },
        },
      });
    },
  });

  const createCar = async (input: CreateCarInput): Promise<Car | undefined> => {
    const response = await createCarMutation({
      variables: { input },
    });
    return response.data?.createCar;
  };

  return {
    createCar,
    loading,
    error,
    data,
  };
};
