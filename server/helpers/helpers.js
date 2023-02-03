export function mixUpArray(arr) {
  const positions = [];
  const countItems = arr.length;

  while (positions.length < arr.length) {
    const randomNumber = getRandomNumber(0, countItems);
    let isThere = false;

    for (let i = 0; i < positions.length; ++i) {
      if (positions[i] === randomNumber) {
        isThere = true;
      }
    }

    if (!isThere) {
      positions.push(randomNumber);
    }
  }

  const _arr = [];
  for (let i = 0; i < positions.length; ++i) {
    _arr.push(arr[positions[i]]);
  }

  return _arr;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}