// __tests__/main.test.js


const { getPostsByUser } = require('./main'); 

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

describe('Тестирование функции getPostsByUser', () => {

  test('Возвращает посты для пользователя Иван', () => {
    const ivanPosts = getPostsByUser(user1.id);
    expect(ivanPosts).toHaveLength(1); 
    expect(ivanPosts[0].title).toBe('пост1'); 
  });

  test('Возвращает посты для пользователя Петр', () => {
    const petrovPosts = getPostsByUser(user2.id);
    expect(petrovPosts).toHaveLength(2); 
    expect(petrovPosts[0].title).toBe('пост2'); 
    expect(petrovPosts[1].title).toBe('пост3'); 
  });

  test('Возвращает пустой массив, если у пользователя нет постов', () => {
    const nonExistentUser = { id: 3, name: "Алексей" };
    const alexeyPosts = getPostsByUser(nonExistentUser.id);
    expect(alexeyPosts).toHaveLength(0); 
  });

  test('Проверка на правильность фильтрации по user_id', () => {
    const ivanPosts = getPostsByUser(user1.id);
    expect(ivanPosts.every(post => post.user_id === user1.id)).toBe(true); // Все посты для Ивана должны иметь правильный user_id
  });

  test('Проверка на отсутствие постов для другого пользователя', () => {
    const petrovPosts = getPostsByUser(user2.id);
    expect(petrovPosts.some(post => post.user_id === user1.id)).toBe(false); // У Петро не должно быть постов Ивана
  });

});
