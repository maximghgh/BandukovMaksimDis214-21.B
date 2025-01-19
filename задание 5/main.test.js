const {
  getPostsByUser,
  removePostById,
  getAllPosts,
  deleteAllPostsByUserId,
  getCommentsByPostId,
  deleteCommentsByPostId,
} = require('./main');

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

describe('Тестирование функций работы с постами и комментариями', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('Тестирование функции getPostsByUser', () => {
    test('Проверка, что есть посты для Ивана', () => {
      const ivanPosts = getPostsByUser(user1.id);
      expect(ivanPosts).toHaveLength(1);
      expect(ivanPosts[0].title).toBe('пост1');
    });

    test('Проверка, что есть посты у Петра', () => {
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
  });

  describe('Тестирование функции removePostById', () => {
    test('Ничего не удаляет, если ID не найден', () => {
      const initialPosts = getAllPosts();
      removePostById(99);
      const remainingPosts = getAllPosts();
      expect(remainingPosts).toEqual(initialPosts);
    });
  });

  describe('Тестирование функции getAllPosts', () => {
    test('Возвращает все посты', () => {
      const allPosts = getAllPosts();
      expect(allPosts).toHaveLength(3);
    });
  });

  describe('Тестирование функции deleteAllPostsByUserId', () => {
    test('Удаляет все посты пользователя', () => {
      deleteAllPostsByUserId(user2.id);
      const remainingPosts = getAllPosts();
      expect(remainingPosts).toHaveLength(1);
      expect(remainingPosts[0].user_id).toBe(user1.id);
    });
  });

  describe('Тестирование функции getCommentsByPostId', () => {
    test('Возвращает комментарии для указанного поста', () => {
      const comments = getCommentsByPostId(1);
      expect(comments).toHaveLength(1);
      expect(comments[0].text).toBe('Отличный пост!');
    });

    test('Возвращает пустой массив, если у поста нет комментариев', () => {
      const comments = getCommentsByPostId(99); 
      expect(comments).toHaveLength(0); 
    });
  });

  describe('Тестирование функции deleteCommentsByPostId', () => {
    test('Удаляет комментарии для указанного поста', () => {
      deleteCommentsByPostId(1);
      const remainingComments = getCommentsByPostId(1);
      expect(remainingComments).toHaveLength(0); 
    });

    test('Ничего не удаляет, если у поста нет комментариев', () => {
      const initialComments = getCommentsByPostId(99); 
      deleteCommentsByPostId(99);
      const remainingComments = getCommentsByPostId(99);
      expect(remainingComments).toEqual(initialComments); 
    });
  });
});
