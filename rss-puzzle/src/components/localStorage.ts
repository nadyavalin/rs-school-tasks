import { User } from "src/type/interfacesAndTypes";

function saveUserToLocalStorage(key: string, value: User) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveUserDatas(user: User): void {
  saveUserToLocalStorage("puzzle-user", user);
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
