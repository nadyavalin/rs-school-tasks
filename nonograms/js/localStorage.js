export function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
