export interface Car extends NewCar {
  id: number;
}

export interface NewCar {
  name: string;
  color: string;
}

export interface CarsResponse {
  cars: Car[];
  total: string | null;
}

export interface CarsStatus {
  id: number;
  status: boolean;
}

export interface CarWinner {
  id: number;
  wins: number;
  time: number;
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
