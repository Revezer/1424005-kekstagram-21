'use strict';

function showComments(photo) {
  const commentsElement = document.querySelector(`.social__comments`);

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

function bigPictureInit(photo) {
  const bigPictureElement = document.querySelector(`.big-picture`);
  const bigImg = bigPictureElement.querySelector(`.big-picture__img img`);
  bigImg.setAttribute(`src`, photo.url);

  const likesCountElement = bigPictureElement.querySelector(`.likes-count`);
  likesCountElement.textContent = photo.likes;

  const commentsCountElement = bigPictureElement.querySelector(`.comments-count`);
  commentsCountElement.textContent = photo.comments.length;

  const descriptionElement = bigPictureElement.querySelector(`.social__caption`);
  descriptionElement.textContent = photo.description;

  const commentCounterElement = bigPictureElement.querySelector(`.social__comment-count`);
  commentCounterElement.classList.add(`hidden`);
  const commentsLoaderElement = bigPictureElement.querySelector(`.comments-loader`);
  commentsLoaderElement.classList.add(`hidden`);

  window.util.bodyElement.classList.add(`modal-open`);

  showComments(photo);

}

bigPictureInit(window.data.photos[0]);
