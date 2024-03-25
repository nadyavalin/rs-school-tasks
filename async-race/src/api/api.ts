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

export default getCars;
