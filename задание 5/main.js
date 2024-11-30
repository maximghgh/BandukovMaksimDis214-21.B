// main.js

// Объекты пользователей
const user1 = {
  id: 1,
  name: "Иван",
  surname: "Иванов",
  login: "ivanov123"
};

const user2 = {
  id: 2,
  name: "Петр",
  surname: "Петров",
  login: "petrov456"
};

// Объекты постов
const posts = [
  { id: 1, title: "пост1", description: "Описание первого поста", user_id: 1 },
  { id: 2, title: "пост2", description: "Описание второго поста", user_id: 2 },
  { id: 3, title: "пост3", description: "Описание третьего поста", user_id: 2 }
];

// Функция для получения постов пользователя по его id
function getPostsByUser(userId) {
  return posts.filter(post => post.user_id === userId);
}

// Экспортируем функцию, чтобы её можно было тестировать
module.exports = { getPostsByUser };
