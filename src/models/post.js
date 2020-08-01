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
    return connection.query('SELECT * FROM posts WHERE postId = $1', [id]);
  }
}

module.exports = PostModel;
