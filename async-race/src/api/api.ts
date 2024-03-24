async function fetchAndDisplayCars() {
  const apiURLGarage = "http://127.0.0.1:3000/garage";
  try {
    const response = await fetch(apiURLGarage);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

export default fetchAndDisplayCars;
