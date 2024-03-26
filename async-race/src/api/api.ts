import { CarsResponse, WinnerCars } from "../types/interfaces";

export async function getCars() {
  const apiURLGarage = "http://127.0.0.1:3000/garage";
  try {
    const response = await fetch(apiURLGarage);
    const cars = await response.json();
    return cars;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

export async function getWinners() {
  const apiURLGarage = "http://127.0.0.1:3000/winners";
  try {
    const response = await fetch(apiURLGarage);
    const winners = await response.json();
    return winners;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
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
export default getCars;
