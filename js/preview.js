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

  bigImg.setAttribute(`src`, photo.url);

  likesCountElement.textContent = photo.likes;

  commentsCountElement.textContent = photo.comments.length;

  descriptionElement.textContent = photo.description;

  commentCounterElement.classList.add(`hidden`);
  commentsLoaderElement.classList.add(`hidden`);

  // window.util.bodyElement.classList.add(`modal-open`);

  showComments(photo);

}

const photos = window.data.generatePhotos(25);

bigPictureInit(photos[0]);
