function setItemToLocalStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveUserDatas(user: object): void {
  if (
    user &&
    Object.prototype.hasOwnProperty.call(user, "firstName") &&
    Object.prototype.hasOwnProperty.call(user, "surname")
  ) {
    setItemToLocalStorage("user", user);
  }
}

function removeItemFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function logoutUser() {
  removeItemFromLocalStorage("user");
}
