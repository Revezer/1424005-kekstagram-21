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

  const MIN_ZOOM_VALUE = 25;
  const MAX_ZOOM_VALUE = 100;
  const ZOOM_VALUE_STEP = 25;

  const FILTER_TAGS = /^#[\w]{1,19}/;
  const MAX_TAGS = 6;

  window.const = {
    MOCK_DESCRTIPTIONS,
    MOCK_MESSAGES,
    MOCK_NAMES,
    NUMBER_OF_PHOTOS,
    MIN_ZOOM_VALUE,
    MAX_ZOOM_VALUE,
    ZOOM_VALUE_STEP,
    FILTER_TAGS,
    MAX_TAGS
  };
})();
