'use strict';

const modalOnloadElement = document.querySelector(`#upload-file`);
const modalOpenElement = document.querySelector(`.img-upload__overlay`);
const modalCloseElement = document.querySelector(`#upload-cancel`);

function resetForm() {
  modalOpenElement.classList.add(`hidden`);
  filterImgElement.style.filter = null;
  effectPinElement.style.left = window.const.STANDART_SLIDER_POSITION;
  effectDepthElement.style.width = window.const.STANDART_SLIDER_POSITION;
  hasttagsElement.value = ``;
  textDescriptionElement.value = ``;
  window.util.bodyElement.classList.remove(`modal-open`);
}

modalOnloadElement.addEventListener(`click`, function () {
  modalOpenElement.classList.remove(`hidden`);
  window.util.bodyElement.classList.add(`modal-open`);
  switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;
  imgCsaleElement.style.transform = `scale(` + window.const.STANDART_SCALE_IMG + `)`;
});

modalCloseElement.addEventListener(`click`, function () {
  resetForm();
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    resetForm();
  }
});


const switchDownElement = document.querySelector(`.scale__control--smaller`);
const switchUpElement = document.querySelector(`.scale__control--bigger`);
const switchingValueElement = document.querySelector(`.scale__control--value`);
const imgCsaleElement = document.querySelector(`.img-upload__preview`);


switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;

function scale() {
  imgCsaleElement.style.transform = `scale(${switchingValueElement.value / window.const.MAX_ZOOM_VALUE})`;
}

switchDownElement.addEventListener(`click`, function () {
  if (parseInt(switchingValueElement.value, 10) <= window.const.MIN_ZOOM_VALUE) {
    return;
  }
  switchingValueElement.value = parseInt(switchingValueElement.value, 10) - window.const.ZOOM_VALUE_STEP;
  scale();
  switchingValueElement.value += `%`;
});

switchUpElement.addEventListener(`click`, function () {
  if (parseInt(switchingValueElement.value, 10) >= window.const.MAX_ZOOM_VALUE) {
    return;
  }
  switchingValueElement.value = parseInt(switchingValueElement.value, 10) + window.const.ZOOM_VALUE_STEP;
  scale();
  switchingValueElement.value += `%`;
});


const effectPinElement = document.querySelector(`.effect-level__pin`);
const filterImgElement = document.querySelector(`.img-upload__preview`);
const sliderElement = document.querySelector(`.img-upload__effect-level`);
const effectDepthElement = document.querySelector(`.effect-level__depth`);


const effectNoneElement = document.querySelector(`#effect-none`);

const effectsElements = {
  chrome: document.querySelector(`#effect-chrome`),
  sepia: document.querySelector(`#effect-sepia`),
  marvin: document.querySelector(`#effect-marvin`),
  phobos: document.querySelector(`#effect-phobos`),
  heat: document.querySelector(`#effect-heat`)
};

const filter = {
  chromium: `filter: grayscale(${window.const.FILTER_CHROMIUM_SEPIA_MARVIN_VALUE})`,
  sepia: `filter: sepia(${window.const.FILTER_CHROMIUM_SEPIA_MARVIN_VALUE})`,
  marvin: `filter: invert(${window.const.FILTER_CHROMIUM_SEPIA_MARVIN_VALUE})`,
  phobos: `filter: blur(${window.const.FILTER_PHOBOS_VALUE})`,
  heat: `filter: brightness(${window.const.FILTER_HEAT_VALUE})`
};

effectNoneElement.addEventListener(`click`, function () {
  sliderElement.style = `display: none`;
  filterImgElement.style.filter = null;
  switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;
});

function filterInit(effectsImg, filterImg) {
  effectsImg.addEventListener(`click`, function () {
    sliderElement.style.display = null;
    filterImgElement.style.filter = null;
    filterImgElement.style = filterImg;
    switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;
    effectPinElement.style.left = window.const.STANDART_SLIDER_POSITION;
    effectDepthElement.style.width = window.const.STANDART_SLIDER_POSITION;
  });
}

filterInit(effectsElements.chrome, filter.chromium);
filterInit(effectsElements.sepia, filter.sepia);
filterInit(effectsElements.marvin, filter.marvin);
filterInit(effectsElements.phobos, filter.phobos);
filterInit(effectsElements.heat, filter.heat);


const hasttagsElement = document.querySelector(`.text__hashtags`);
const textDescriptionElement = document.querySelector(`.text__description`);

hasttagsElement.addEventListener(`input`, function () {
  let arrayTags = hasttagsElement.value;
  const arrayHasttags = arrayTags.split(` `);
  arrayHasttags.forEach(function (i) {
    if (window.const.FILTER_TAGS.test(i) === false) {
      hasttagsElement.setCustomValidity(`перед началом тэга поставьте #, используйте буквы и цифры`);
    } else {
      hasttagsElement.setCustomValidity(``);
    }
  });
  if (arrayHasttags.length >= window.const.MAX_TAGS) {
    hasttagsElement.setCustomValidity(`тэгов может быть не больше 5`);
  }

  hasttagsElement.reportValidity();
});


const formElement = document.querySelector(`.img-upload__form`);

const outputStatusContainerElement = document.querySelector(`main`);
const errorTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
const successTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);

function outputStatusError() {
  const errorTemplate = errorTemplateElement.cloneNode(true);
  outputStatusContainerElement.appendChild(errorTemplate);
}

function outputStatusSuccess() {
  const successTemplate = successTemplateElement.cloneNode(true);
  outputStatusContainerElement.appendChild(successTemplate);
}

outputStatusSuccess();
outputStatusError();

const successPopupElement = document.querySelector(`.success`);
const errorPopupElement = document.querySelector(`.error`);

document.addEventListener(`click`, function () {
  successPopupElement.classList.add(`hidden`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    successPopupElement.classList.add(`hidden`);
  }
});

document.addEventListener(`click`, function () {
  errorPopupElement.classList.add(`hidden`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    errorPopupElement.classList.add(`hidden`);
  }
});


formElement.addEventListener(`submit`, function (evt) {
  window.backend.uploadPhoto(new FormData(formElement), function () {
    successPopupElement.classList.remove(`hidden`);
    resetForm();
  }, function () {
    errorPopupElement.classList.remove(`hidden`);
    resetForm();
  });
  evt.preventDefault();
});
