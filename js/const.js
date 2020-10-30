'use strict';

(function () {
  const NUMBER_OF_PHOTOS = 25;

  const FILTER_CHROMIUM_SEPIA_MARVIN_VALUE = `20%`;
  const FILTER_PHOBOS_VALUE = `4px`;
  const FILTER_HEAT_VALUE = 3;

  const MIN_ZOOM_VALUE = 25;
  const MAX_ZOOM_VALUE = 100;
  const ZOOM_VALUE_STEP = 25;
  const STANDART_SLIDER_POSITION = `90px`;
  const STANDART_SCALE_IMG = 1;

  const FILTER_LETTERS = /[^grayscale|sepia|invert|blur|brightness][{(0-9px)}]+/g;
  const FILTER_EFFECTS = {
    chromium: {
      min: 0,
      max: 1
    },
    sepia: {
      min: 0,
      max: 1
    },
    marvin: {
      min: 0,
      max: 100
    },
    phobos: {
      min: 0,
      max: 3
    },
    heat: {
      min: 1,
      max: 3
    }
  };

  const FILTER_TAGS = /^#[\w]{1,19}/;
  const MAX_TAGS = 6;

  const MAX_VALUE_SIZE = 1180;
  const MIN_VALUE_SIZE = 730;
  const MAX_PIN_VALUE = `450px`;
  const MIN_PIN_VALUE = `0px`;

  const ARRAY_SIZE = 5;
  const NUMBER_COMMENTS = 0;

  const filtersButtonsElement = document.querySelectorAll(`.img-filters__button`);
  const FILTER_DEFAULT_BUTTON = filtersButtonsElement[0];
  const FILTER_RANDOM_BUTTON = filtersButtonsElement[1];
  const FILTER_COMMENTS_BUTTON = filtersButtonsElement[2];
  const RANDOM_PICTURE_LENGTH = 10;
  const FILTER_DEFAULT = 1;
  const FILTER_RANDOM = 2;
  const FILTER_COMMENTS = 3;
  const DEBOUNCE_INTERVAL = 500;

  window.const = {
    NUMBER_OF_PHOTOS,
    FILTER_CHROMIUM_SEPIA_MARVIN_VALUE,
    FILTER_PHOBOS_VALUE,
    FILTER_HEAT_VALUE,
    MIN_ZOOM_VALUE,
    MAX_ZOOM_VALUE,
    ZOOM_VALUE_STEP,
    STANDART_SLIDER_POSITION,
    STANDART_SCALE_IMG,
    FILTER_LETTERS,
    FILTER_EFFECTS,
    FILTER_TAGS,
    MAX_TAGS,
    MAX_VALUE_SIZE,
    MIN_VALUE_SIZE,
    MAX_PIN_VALUE,
    MIN_PIN_VALUE,
    ARRAY_SIZE,
    NUMBER_COMMENTS,
    FILTER_DEFAULT_BUTTON,
    FILTER_RANDOM_BUTTON,
    FILTER_COMMENTS_BUTTON,
    RANDOM_PICTURE_LENGTH,
    FILTER_DEFAULT,
    FILTER_RANDOM,
    FILTER_COMMENTS,
    DEBOUNCE_INTERVAL
  };
})();
