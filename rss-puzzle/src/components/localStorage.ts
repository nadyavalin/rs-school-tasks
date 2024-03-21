import { User } from "src/type/interfacesAndTypes";

function setItemToLocalStorage(key: string, value: User) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveUserToLocalStorage(user: User): void {
  setItemToLocalStorage("puzzle-user", user);
}

function removeItemFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function logoutUser() {
  removeItemFromLocalStorage("puzzle-user");
}

export function getUserInfo(): User {
  const userData = localStorage.getItem("puzzle-user");
  return userData ? JSON.parse(userData) : null;
}
