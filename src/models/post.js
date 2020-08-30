const Model = require('./model');

class PostModel extends Model {
  id;
  title;
  body;
  userId;
  photoUrl;
  likes;

  /**
   * @param {string} title
   * @param {string} body
   * @param {string} userId
   * @param {string} photoUrl
   * @param {number} likes
   */
  constructor(title, body, userId, photoUrl) {
    super('post');
    this.id = this.generateId();
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.photoUrl = photoUrl;
    this.likes = 0;
  }

  /**
   * @param {string} id
   */
  static async Get(id) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, title, body, user_id as "userId" ' +
        'FROM posts ' +
        'WHERE id = $1;',
        [id]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error getting post', error);
      return {};
    }
  }

  /**
   *
   * @param post
   */
  static async Insert(post) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, title, body, user_id as "userId" ' +
        'FROM posts ' +
        'WHERE id = $1;',
        [id]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error creating post', error);
      return {};
    }
  }
}

module.exports = PostModel;
