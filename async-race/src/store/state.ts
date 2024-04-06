import { State } from "../types/interfaces";

export const state: State = {
  cars: [],
  carsPerPage: 7,
  components: {
    inputUpdateCarColor: null,
    inputUpdateCarModel: null,
    nextButton: null,
  },
  page: 1,
  selectedCar: undefined,
  selectedCarArea: null,
  totalCars: 0,
};

export default state;
