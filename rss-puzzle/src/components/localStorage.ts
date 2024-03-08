function setItemToLocalStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveUserDatas(user: object): void {
  if (
    user &&
    Object.prototype.hasOwnProperty.call(user, "firstName") &&
    Object.prototype.hasOwnProperty.call(user, "surname")
  ) {
    setItemToLocalStorage("user", user);
  }
}

export default saveUserDatas;
