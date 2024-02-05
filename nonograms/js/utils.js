// высчитать таймер исходя их полученных секунд
export function getTimerByTime(timeResult) {
  const minutes = Math.floor(timeResult / 60);
  const seconds = timeResult % 60;

  let minutesStr = "";
  if (minutes < 10) {
    minutesStr = `0${minutes}`;
  } else {
    minutesStr = minutes.toString();
  }

  let secondsStr = "";
  if (seconds < 10) {
    secondsStr = `0${seconds}`;
  } else {
    secondsStr = seconds.toString();
  }

  return `${minutesStr}:${secondsStr}`;
}

// сравнение массивов (проверка победы)
export function compareArrays(firstArray, secondArray) {
  for (let i = 0; i < firstArray.length; i += 1) {
    for (let j = 0; j < firstArray[i].length; j += 1) {
      if (firstArray[i][j] !== secondArray[i][j]) {
        return false;
      }
    }
  }
  return true;
}
