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
  static async getComments(id) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, body, user_id, post_id ' +
        'FROM comments ' +
        'WHERE post_id = $1;',
        [id]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error getting comments', error);
      return {};
    }
  }
  /**
   * @param {string} id
   */
  static async Get(id) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, title, body, user_id AS "userId", photo_url AS "photoUrl", likes ' +
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
   *
   */
  static async Insert(post) {
    try {
      const { id, title, body, userId, photoUrl } = post;
      await this.postgres.query(
        'INSERT INTO posts (id, title, body, user_id, photo_url)'
        + 'VALUES ($1, $2, $3, $4, $5);',
        [id, title, body, userId, photoUrl]
      );
      return { id };
    }
    catch (error) {
      console.log('Error creating post', error);
      return {};
    }
  }

  /**
   *
   * @param {string} id
   *
   */
  static async Delete(id) {
    console.log(id);
    try {
      await this.postgres.query('DELETE FROM posts WHERE id = $1 RETURNING *;', [id]);
      return true;
    }
    catch (error) {
      console.log('Error deleting post', error);
      return false;
    }
  }

  /**
   *
   * @param {string} id
   * @param {object} update
   */
  static async update(id, update) {
    try {
      const { title, body, userId, photoUrl } = update;
      console.log(this.update);
      await this.postgres.query(
        'UPDATE posts ' +
        'SET id = $1, title = $2, body = $3, user_id = $4, photo_url = $5 ' +
        'WHERE id = $1;',
        [id, title, body, userId, photoUrl]
      );

      return { id };
    }
    catch (error) {
      console.log('Error updating post', error);
      return {};
    }
  }
}

module.exports = PostModel;
