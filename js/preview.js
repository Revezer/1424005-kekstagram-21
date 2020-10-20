'use strict';

const commentsElement = document.querySelector(`.social__comments`);

function showComments(photo) {
  photo.comments.forEach(function (comment) {
    const templateСomments =
      `<li class="social__comment">
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>`;
    commentsElement.insertAdjacentHTML(`beforeend`, templateСomments);
  });
}

const bigPictureElement = document.querySelector(`.big-picture`);
const bigImg = bigPictureElement.querySelector(`.big-picture__img img`);
const likesCountElement = bigPictureElement.querySelector(`.likes-count`);
const commentsCountElement = bigPictureElement.querySelector(`.comments-count`);
const descriptionElement = bigPictureElement.querySelector(`.social__caption`);
const commentCounterElement = bigPictureElement.querySelector(`.social__comment-count`);
const commentsLoaderElement = bigPictureElement.querySelector(`.comments-loader`);

function bigPictureInit(photo) {
  bigPictureElement.classList.remove(`hidden`);

  bigImg.setAttribute(`src`, photo.url);

  likesCountElement.textContent = photo.likes;

  commentsCountElement.textContent = photo.comments.length;

  descriptionElement.textContent = photo.description;

  commentCounterElement.classList.add(`hidden`);
  commentsLoaderElement.classList.add(`hidden`);

  window.util.bodyElement.classList.add(`modal-open`);

  showComments(photo);

}


const openPreviewElements = document.querySelectorAll(`.picture`);
const closePreviewElement = document.querySelector(`.big-picture__cancel`);

closePreviewElement.addEventListener(`click`, function () {
  bigPictureElement.classList.add(`hidden`);
  commentCounterElement.classList.remove(`hidden`);
  commentsLoaderElement.classList.remove(`hidden`);
  window.util.bodyElement.classList.remove(`modal-open`);
  const deleteCommentsElement = document.querySelector(`.social__comments`);
  deleteCommentsElement.innerHTML = ``;
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    bigPictureElement.classList.add(`hidden`);
    window.util.bodyElement.classList.remove(`modal-open`);
  }
});

openPreviewElements.forEach((element, i) => {
  element.addEventListener(`click`, function () {
    bigPictureInit(window.main.photos[i]);
  });
});

const sliderPinElement = document.querySelector(`.effect-level__pin`);
const filterValueElement = document.querySelector(`.img-upload__preview`);
const sliderDepthElement = document.querySelector(`.effect-level__depth`);

const chromium = {
  value0: `grayscale(0%)`,
  value10: `grayscale(10%)`,
  value20: `grayscale(20%)`,
  value30: `grayscale(30%)`,
  value40: `grayscale(40%)`,
  value50: `grayscale(50%)`,
  value60: `grayscale(60%)`,
  value70: `grayscale(70%)`,
  value80: `grayscale(80%)`,
  value90: `grayscale(90%)`,
  value100: `grayscale(100%)`
};

const sepia = {
  value0: `sepia(0%)`,
  value10: `sepia(10%)`,
  value20: `sepia(20%)`,
  value30: `sepia(30%)`,
  value40: `sepia(40%)`,
  value50: `sepia(50%)`,
  value60: `sepia(60%)`,
  value70: `sepia(70%)`,
  value80: `sepia(80%)`,
  value90: `sepia(90%)`,
  value100: `sepia(100%)`
};

const marvin = {
  value0: `invert(0%)`,
  value10: `invert(10%)`,
  value20: `invert(20%)`,
  value30: `invert(30%)`,
  value40: `invert(40%)`,
  value50: `invert(50%)`,
  value60: `invert(60%)`,
  value70: `invert(70%)`,
  value80: `invert(80%)`,
  value90: `invert(90%)`,
  value100: `invert(100%)`
};

const phobos = {
  value0: `blur(0px)`,
  value10: `blur(2px)`,
  value20: `blur(4px)`,
  value30: `blur(6px)`,
  value40: `blur(8px)`,
  value50: `blur(10px)`,
  value60: `blur(12px)`,
  value70: `blur(14px)`,
  value80: `blur(16px)`,
  value90: `blur(18px)`,
  value100: `blur(20px)`
};

const heat = {
  value0: `brightness(1)`,
  value10: `brightness(2)`,
  value20: `brightness(3)`,
  value30: `brightness(4)`,
  value40: `brightness(5)`,
  value50: `brightness(6)`,
  value60: `brightness(7)`,
  value70: `brightness(8)`,
  value80: `brightness(9)`,
  value90: `brightness(10)`,
  value100: `brightness(11)`
};


function filterСhange(filters, value) {
  if (value <= 0) {
    filterValueElement.style.filter = filters.value0;
  }

  if (value > 0) {
    filterValueElement.style.filter = filters.value10;
  }

  if (value > 50) {
    filterValueElement.style.filter = filters.value20;
  }

  if (value > 100) {
    filterValueElement.style.filter = filters.value30;
  }

  if (value > 150) {
    filterValueElement.style.filter = filters.value40;
  }

  if (value > 200) {
    filterValueElement.style.filter = filters.value50;
  }

  if (value > 250) {
    filterValueElement.style.filter = filters.value60;
  }

  if (value > 300) {
    filterValueElement.style.filter = filters.value70;
  }

  if (value > 350) {
    filterValueElement.style.filter = filters.value80;
  }

  if (value > 400) {
    filterValueElement.style.filter = filters.value90;
  }

  if (value >= 450) {
    filterValueElement.style.filter = filters.value100;
  }
}

sliderPinElement.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    sliderPinElement.style.left = (sliderPinElement.offsetLeft - shift.x) + `px`;
    sliderDepthElement.style.width = sliderPinElement.style.left;
    if (startCoords.x > window.const.MAX_VALUE_SIZE) {
      sliderPinElement.style.left = window.const.MAX_PIN_VALUE;
    }

    if (startCoords.x < window.const.MIN_VALUE_SIZE) {
      sliderPinElement.style.left = window.const.MIN_PIN_VALUE;
    }

    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `grayscale`) {
      filterСhange(chromium, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `sepia`) {
      filterСhange(sepia, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `invert`) {
      filterСhange(marvin, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `blur`) {
      filterСhange(phobos, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `brightness`) {
      filterСhange(heat, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
  };


  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
