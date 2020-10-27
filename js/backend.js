'use strict';
(function () {
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  const handleRequest = (onSuccess, onError, xhr) => {
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  const loadPhotos = (successHandler, errorHandler) => {
    const URL = `https://21.javascript.pages.academy/kekstagram/data`;
    const xhr = new XMLHttpRequest();
    handleRequest(successHandler, errorHandler, xhr);

    xhr.open(`GET`, URL);
    xhr.send();
  };

  const uploadPhoto = (data, successHandler, errorHandler) => {
    const URL = `https://21.javascript.pages.academy/kekstagram`;
    const xhr = new XMLHttpRequest();
    handleRequest(successHandler, errorHandler, xhr);

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    loadPhotos,
    uploadPhoto
  };
})();