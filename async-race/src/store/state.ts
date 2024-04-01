import { State } from "../types/interfaces";

export const state: State = {
  page: 1,
  cars: [],
  carsPerPage: 7,
  totalCars: 0,
  selectedCar: undefined,
  selectedCarArea: null,
};

export default state;
