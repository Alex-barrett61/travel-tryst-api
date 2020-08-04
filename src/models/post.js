const connection = require('../data-sources/connection');

class PostModel {
  title;
  body;
  userId;

  /**
   *
   * @param {string} title
   * @param {string} body
   * @param {string} userId
   */
  constructor(title, body, userId) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  /**
   * @param {string} id
   */
  static async Get(id) {
    try {
      const rows = await connection.query('SELECT * FROM posts WHERE id = $1', [id]);
      return rows[0];
    }
    catch (error) {
      console.log('Error getting post', error);
      return {};
    }
  }
}

module.exports = PostModel;
