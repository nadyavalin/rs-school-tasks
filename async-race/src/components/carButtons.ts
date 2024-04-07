import { deleteCarFromGarage } from "src/api/api";
import { state } from "../store/state";

export function selectCar(eventTarget: HTMLDivElement) {
  const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
  if (carElement && carElement.dataset.id) {
    const carId = carElement.dataset.id;
    state.selectedCar = state.cars.find((car) => String(car.id) === carId);
    state.selectedCarArea = carElement;
    
    if (state.components.inputUpdateCarModel) {
      state.components.inputUpdateCarModel.value = state.selectedCar?.name ?? "";
    }

    if (state.components.inputUpdateCarColor) {
      state.components.inputUpdateCarColor.value = state.selectedCar?.color ?? "";
    }
  }
}

export async function deleteCar(eventTarget: HTMLDivElement) {
  const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
  const carId = carElement?.dataset.id; 
  if (carElement && carId) {
    state.selectedCar = state.cars.find((car) => String(car.id) === carId);
    if (state.selectedCar) {
      await deleteCarFromGarage(state.selectedCar.id);
      state.selectedCar = undefined;
      state.selectedCarArea = null;
      carElement.remove();
    }
  }
}
