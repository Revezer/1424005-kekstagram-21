'use strict';

(function () {
  const bodyElement = document.querySelector(`body`);
  const picturesListElement = document.querySelector(`.pictures`);
  const filtersButtonsElement = document.querySelectorAll(`.img-filters__button`);

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function getRandomElementFromArray(arr) {
    return arr[getRandomInt(1, arr.length)];
  }

  function resetGallery() {
    while (picturesListElement.children.length > 2) {
      picturesListElement.removeChild(picturesListElement.lastChild);
    }
  }

  function activeButton(button) {
    Array.from(filtersButtonsElement).forEach(function (element) {
      element.classList.remove(`img-filters__button--active`);
    });
    button.classList.add(`img-filters__button--active`);
  }

  function getRandomPicture(pictureObjects) {
    let randomPictureObjects = [];
    let pictureObjectsCopy = pictureObjects.slice();
    for (let i = 0; i < window.const.RANDOM_PICTURE_LENGTH; i++) {
      let randomIndex = window.util.getRandomInt(0, pictureObjectsCopy.length - 1);
      randomPictureObjects.push(pictureObjectsCopy[randomIndex]);
      pictureObjectsCopy.splice(randomIndex, 1);
    }
    return randomPictureObjects;
  }
  function sortByCommentsPicture(pictureObjects) {
    return pictureObjects.slice().sort((left, right) => right.comments.length - left.comments.length);
  }

  window.util = {
    bodyElement,
    getRandomInt,
    getRandomElementFromArray,
    resetGallery,
    activeButton,
    getRandomPicture,
    sortByCommentsPicture
  };
})();
