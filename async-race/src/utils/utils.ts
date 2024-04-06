import { carModels, carNames } from "./constants";

export function getRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
}

export function generateRandomCarData() {
  const randomCarIndex = Math.floor(Math.random() * carNames.length);
  const randomCarName = carNames[randomCarIndex];

  const randomCarModelIndex = Math.floor(
    Math.random() * carModels[randomCarIndex].length,
  );
  const randomCarModel = carModels[randomCarIndex][randomCarModelIndex];

  return {
    name: `${randomCarName} ${randomCarModel}`,
    color: getRandomColor(),
  };
}
