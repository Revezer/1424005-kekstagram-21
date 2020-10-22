'use strict';

(function () {
  const bodyElement = document.querySelector(`body`);

  function getRandomInt(min, max) {
    return Math.floor(Math.random(min) * Math.floor(max));
  }

  function getRandomElementFromArray(arr) {
    return arr[getRandomInt(1, arr.length)];
  }

  function filterValue(nameFilter, filter, step, sign) {
    for (let i = 0; i < 11; i++) {
      let j = i * step;
      let k = i * 10;
      nameFilter[`value` + k] = filter + `(` + j + sign + `)`;
    }
  }

  window.util = {
    bodyElement,
    getRandomInt,
    getRandomElementFromArray,
    filterValue
  };
})();
