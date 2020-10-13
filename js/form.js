'use strict';

const modalOnloadElement = document.querySelector(`#upload-file`);
const modalOpenElement = document.querySelector(`.img-upload__overlay`);
const modalCloseElement = document.querySelector(`#upload-cancel`);

modalOnloadElement.addEventListener(`click`, function () {
  modalOpenElement.classList.remove(`hidden`);
  bodyElement.classList.add(`modal-open`);
});

modalCloseElement.addEventListener(`click`, function () {
  modalOpenElement.classList.add(`hidden`);
  bodyElement.classList.remove(`modal-open`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    modalOpenElement.classList.add(`hidden`);
    bodyElement.classList.remove(`modal-open`);
  }
});


const switchDownElement = document.querySelector(`.scale__control--smaller`);
const switchUpElement = document.querySelector(`.scale__control--bigger`);
const switchingValueElement = document.querySelector(`.scale__control--value`);
const imgCsaleElement = document.querySelector(`.img-upload__preview`);
const MIN_VALUE = `25%`;
const MAX_VALUE = `100%`;
const VALUE_STEP = 25;
const MAX_SCALE = 100;

switchingValueElement.value = MAX_VALUE;

function scale() {
  imgCsaleElement.style.transform = `scale(${switchingValueElement.value / MAX_SCALE})`;
}

switchDownElement.addEventListener(`click`, function () {
  if (switchingValueElement.value === MIN_VALUE) {
    return;
  } else {
    switchingValueElement.value = parseInt(switchingValueElement.value, 10) - VALUE_STEP;
    scale();
    switchingValueElement.value += `%`;
  }
});

switchUpElement.addEventListener(`click`, function () {
  if (switchingValueElement.value === MAX_VALUE) {
    return;
  } else {
    switchingValueElement.value = parseInt(switchingValueElement.value, 10) + VALUE_STEP;
    scale();
    switchingValueElement.value += `%`;
  }
});


const effectPinElement = document.querySelector(`.effect-level__pin`);
const filterImgElement = document.querySelector(`.img-upload__preview`);
const sliderElement = document.querySelector(`.img-upload__effect-level`);

effectPinElement.addEventListener(`mouseup`, function () {
  filterImgElement.style.filter = null;
});


const effectNoneElement = document.querySelector(`#effect-none`);

const effectsElements = {
  chrome: document.querySelector(`#effect-chrome`),
  sepia: document.querySelector(`#effect-sepia`),
  marvin: document.querySelector(`#effect-marvin`),
  phobos: document.querySelector(`#effect-phobos`),
  heat: document.querySelector(`#effect-heat`)
};

const filter = {
  chromium: `filter: grayscale(1)`,
  sepia: `filter: sepia(1)`,
  marvin: `filter: invert(100%)`,
  phobos: `filter: blur(3px)`,
  heat: `filter: brightness(3)`
};

effectNoneElement.addEventListener(`click`, function () {
  sliderElement.style = `display: none`;
  filterImgElement.style.filter = null;
  switchingValueElement.value = MAX_VALUE;
});

function filterInit(effectsImg, filterImg) {
  effectsImg.addEventListener(`click`, function () {
    sliderElement.style.display = null;
    filterImgElement.style.filter = null;
    filterImgElement.style = filterImg;
    switchingValueElement.value = MAX_VALUE;
  });
}

filterInit(effectsElements.chrome, filter.chromium);
filterInit(effectsElements.sepia, filter.sepia);
filterInit(effectsElements.marvin, filter.marvin);
filterInit(effectsElements.phobos, filter.phobos);
filterInit(effectsElements.heat, filter.heat);


const hasttagsElement = document.querySelector(`.text__hashtags`);
const FILTER_TAGS = /^#[\w]{1,19}/;
const MAX_TAGS = 6;

hasttagsElement.addEventListener(`input`, function () {
  let arrayTags = hasttagsElement.value;
  const arrayHasttags = arrayTags.split(` `);
  arrayHasttags.forEach(function (i) {
    if (FILTER_TAGS.test(i) === false) {
      hasttagsElement.setCustomValidity(`перед началом тэга поставьте #, используйте буквы и цифры`);
    } else {
      hasttagsElement.setCustomValidity(``);
    }
  });
  if (arrayHasttags.length >= MAX_TAGS) {
    hasttagsElement.setCustomValidity(`тэгов может быть не больше 5`);
  }

  hasttagsElement.reportValidity();
});
