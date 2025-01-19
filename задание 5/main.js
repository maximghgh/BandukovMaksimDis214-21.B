let posts;
// Объекты пользователей
const user1 = {
  id: 1,
  name: "Иван",
  surname: "Иванов",
  login: "ivanov123",
};

const user2 = {
  id: 2,
  name: "Петр",
  surname: "Петров",
  login: "petrov456",
};

// Объекты постов
beforeEach(() => {
  posts = [
    { id: 1, title: "пост1", description: "Описание первого поста", user_id: 1 },
    { id: 2, title: "пост2", description: "Описание второго поста", user_id: 2 },
    { id: 3, title: "пост3", description: "Описание третьего поста", user_id: 2 },
  ];

  jest.resetModules();
  jest.doMock('./main', () => ({
    ...jest.requireActual('./main'),
    posts,
  }));
});

// Объекты комментариев
const comments = [
  { id: 1, post_id: 1, text: "Отличный пост!" },
  { id: 2, post_id: 2, text: "Спасибо за информацию." },
  { id: 3, post_id: 3, text: "Очень полезно." },
];

// Получить все посты пользователя
function getPostsByUser(userId) {
  return posts.filter((post) => post.user_id === userId);
}

// Удалить пост по ID
function removePostById(postId) {
  return posts.filter((post) => post.id !== postId);
}

// Получить все посты
function getAllPosts() {
  return posts;
}

// Удалить все посты пользователя по user_id
function deleteAllPostsByUserId(userId) {
  const initialLength = posts.length;
  for (let i = posts.length - 1; i >= 0; i--) {
    if (posts[i].user_id === userId) {
      posts.splice(i, 1);
    }
  }
  console.log(
    `Удалено ${initialLength - posts.length} постов пользователя с ID ${userId}.`
  );
}

// Получить комментарии для поста
function getCommentsByPostId(postId) {
  return comments.filter((comment) => comment.post_id === postId);
}

// Удалить комментарии для поста
function deleteCommentsByPostId(postId) {
  const initialLength = comments.length;
  for (let i = comments.length - 1; i >= 0; i--) {
    if (comments[i].post_id === postId) {
      comments.splice(i, 1);
    }
  }
  console.log(
    `Удалено ${initialLength - comments.length} комментариев для поста с ID ${postId}.`
  );
}

module.exports = {
  getPostsByUser,
  removePostById,
  getAllPosts,
  deleteAllPostsByUserId,
  getCommentsByPostId,
  deleteCommentsByPostId,
};
