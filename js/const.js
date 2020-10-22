'use strict';

(function () {
  const MOCK_DESCRTIPTIONS = [
    `фото`,
    `Как получилось`,
    `Отдых`,
    `Как вам`,
    `я не понял`,
  ];
  const MOCK_MESSAGES = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];
  const MOCK_NAMES = [
    `Арутур`,
    `Саша`,
    `Лена`,
    `Яна`
  ];
  const NUMBER_OF_PHOTOS = 25;

  const FILTER_CHROMIUM_SEPIA_MARVIN_VALUE = `20%`;
  const FILTER_PHOBOS_VALUE = `4px`;
  const FILTER_HEAT_VALUE = 3;

  const MIN_ZOOM_VALUE = 25;
  const MAX_ZOOM_VALUE = 100;
  const ZOOM_VALUE_STEP = 25;
  const STANDART_SLIDER_POSITION = `90px`;

  const PIT_POINT = `90px`;
  const FILTER_LETTERS = /[^grayscale|sepia|invert|blur|brightness][{(0-9px)}]+/g;
  const FILTER_NUMBER = /\d+/;

  const FILTER_TAGS = /^#[\w]{1,19}/;
  const MAX_TAGS = 6;

  const MAX_VALUE_SIZE = 1180;
  const MIN_VALUE_SIZE = 730;
  const MAX_PIN_VALUE = `450px`;
  const MIN_PIN_VALUE = `0px`;

  const STEP_FILTER_CHROMIUM_SEPIA_MARVIN = 10;
  const STEP_FILTER_PHOBOS = 2;
  const STEP_FILTER_HEAT = 1;

  window.const = {
    MOCK_DESCRTIPTIONS,
    MOCK_MESSAGES,
    MOCK_NAMES,
    NUMBER_OF_PHOTOS,
    FILTER_CHROMIUM_SEPIA_MARVIN_VALUE,
    FILTER_PHOBOS_VALUE,
    FILTER_HEAT_VALUE,
    MIN_ZOOM_VALUE,
    MAX_ZOOM_VALUE,
    ZOOM_VALUE_STEP,
    STANDART_SLIDER_POSITION,
    PIT_POINT,
    FILTER_LETTERS,
    FILTER_NUMBER,
    FILTER_TAGS,
    MAX_TAGS,
    MAX_VALUE_SIZE,
    MIN_VALUE_SIZE,
    MAX_PIN_VALUE,
    MIN_PIN_VALUE,
    STEP_FILTER_CHROMIUM_SEPIA_MARVIN,
    STEP_FILTER_PHOBOS,
    STEP_FILTER_HEAT
  };
})();
