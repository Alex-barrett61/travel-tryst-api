const { postgres } = require('../data-sources/connections');

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
      const rows = await postgres.query(
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
}

module.exports = PostModel;
