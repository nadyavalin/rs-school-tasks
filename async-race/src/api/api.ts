import { CarsResponse, WinnerCars, NewCar } from "../types/interfaces";

export async function getCars() {
  const apiURLGarage = "http://127.0.0.1:3000/garage";
  const response = await fetch(apiURLGarage);
  const cars = await response.json();
  return cars;
}

export async function getWinners() {
  const apiURLGarage = "http://127.0.0.1:3000/winners";
  const response = await fetch(apiURLGarage);
  const winners = await response.json();
  return winners;
}

export async function getCarsPerPage(page: string): Promise<CarsResponse> {
  const response = await fetch(
    `http://127.0.0.1:3000/garage?${new URLSearchParams({
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
  const response = await fetch(`http://127.0.0.1:3000/winners/${id}`);

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

export async function createNewCarInGarage(carData: NewCar): Promise<NewCar> {
  const response = await fetch("http://127.0.0.1:3000/garage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  return response.json();
}

export default getCars;
