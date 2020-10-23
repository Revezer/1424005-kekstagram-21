'use strict';

(function () {
  const bodyElement = document.querySelector(`body`);

  function getRandomInt(min, max) {
    return Math.floor(Math.random(min) * Math.floor(max));
  }

  function getRandomElementFromArray(arr) {
    return arr[getRandomInt(1, arr.length)];
  }

  window.util = {
    bodyElement,
    getRandomInt,
    getRandomElementFromArray
  };
})();
