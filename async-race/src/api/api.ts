import {
  Car,
  CarsResponse,
  WinnerCars,
  NewCar,
  CarsStatus,
} from "../types/interfaces";

const BASE_URL = "http://127.0.0.1:3000";

export async function getCars() {
  const apiURLGarage = `${BASE_URL}/garage`;
  const response = await fetch(apiURLGarage);
  const cars = await response.json();
  return cars;
}

export async function getWinners() {
  const apiURLGarage = `${BASE_URL}/winners`;
  const response = await fetch(apiURLGarage);
  const winners = await response.json();
  return winners;
}

export async function getCarsPerPage(page: string): Promise<CarsResponse> {
  const response = await fetch(
    `${BASE_URL}/garage?${new URLSearchParams({
      _page: page,
      _limit: "7",
    })}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const cars = await response.json();
  const total = response.headers.get("X-Total-Count");

  return {
    cars,
    total,
  };
}

export async function getWinnersPerPage(id: number): Promise<WinnerCars> {
  const response = await fetch(`${BASE_URL}/winners/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const winner = await response.json();
  return {
    id: winner.id,
    wins: winner.wins,
    time: winner.time,
  };
}

export async function createNewCarInGarage(carData: NewCar): Promise<Car> {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  return response.json();
}

export async function updateCarAttributes(carData: Car): Promise<Car> {
  const { id } = carData;
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  return response.json();
}

export async function deleteCarFromGarage(id: number): Promise<void> {
  await fetch(`${BASE_URL}/garage/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// it doesn't use yet
export async function controlCarEngine(
  id: number,
  status: boolean,
): Promise<CarsStatus> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: "PATCH",
  });
  return response.json();
}

export default getCarsPerPage;
