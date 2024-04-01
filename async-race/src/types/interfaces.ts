export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarsResponse {
  cars: Car[];
  total: string | null;
}

export interface CarsStatus {
  id: number;
  status: true | false;
}

export interface WinnerCars {
  id: number;
  wins: number;
  time: number;
}

export interface NewCar {
  name: string;
  color: string;
}

export interface State {
  page: number;
  cars: Car[];
  carsPerPage: number;
  totalCars: number;
  selectedCar?: Car;
  selectedCarArea: HTMLDivElement | null;
}

// it doesn't use yet
export interface CarEngine {
  velocity: number;
  distance: number;
}
