import { gql } from "@apollo/client";

export const GET_CARS = gql`
  query GetCars($make: String, $model: String, $year: Int, $color: String) {
    cars(make: $make, model: $model, year: $year, color: $color) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const GET_CAR = gql`
  query GetCar($id: ID!) {
    car(id: $id) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;
