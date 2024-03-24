export interface Car {
  name: string;
  color: string;
  id: number;
  isEngineStarted?: boolean;
}

export interface CarResponse {
  items: Car[];
  count: string | null;
}

export interface WinnerCar {
  id: number;
  wins: number;
  time: number;
}
