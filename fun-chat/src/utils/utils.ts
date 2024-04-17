export function addZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

export default addZero;
