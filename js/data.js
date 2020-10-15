'use strict';

function generatePost(i) {
  const post = {
    url: `photos/${i}.jpg`,
    description: window.util.getRandomElementFromArray(window.const.MOCK_DESCRTIPTIONS),
    likes: window.util.getRandomInt(15, 200),
    comments: [],
  };

  const commentsCount = window.util.getRandomInt(0, 5);

  for (let j = 1; j <= commentsCount; j++) {
    const comment = {
      avatar: `img/avatar-${window.util.getRandomInt(1, 6)}.svg`,
      message: window.util.getRandomElementFromArray(window.const.MOCK_MESSAGES),
      name: window.util.getRandomElementFromArray(window.const.MOCK_NAMES)
    };

    post.comments.push(comment);
  }

  return post;
}

(function () {
  function generatePhotos(cnt) {
    const result = [];

    for (let i = 1; i <= cnt; i++) {
      result.push(generatePost(i));
    }

    return result;
  }
  window.data = {
    generatePhotos
  };
})();
