export interface Car {
  color: string;
  id: number;
  name: string;
}

export interface CarsResponse {
  cars: Car[];
  total: string | null;
}

export interface WinnerCars {
  id: number;
  wins: number;
  time: number;
}
