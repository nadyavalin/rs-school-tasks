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
  cars: Car[];
  selectedCar?: Car;
}
