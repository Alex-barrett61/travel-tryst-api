const Model = require('./model');

class UserModel extends Model {

  id;
  name;
  email;
  password;
  phone;

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} phone
   *
   */
  constructor(name, email, password, phone) {
    super('user');
    this.id = this.generateId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  /**
   * @param {string} id
   */
  static async getPosts(id) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, title, body, user_id FROM posts WHERE user_id = $1;',
        [id]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error getting comment', error);
      return {};
    }
  }

  /**
   * @param {string} id
   */
  static async Get(id) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, name, email, password, phone FROM users WHERE id = $1;',
        [id]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error getting comment', error);
      return {};
    }
  }

  /**
   *
   * @param user
   *
   */
  static async Insert(user) {
    try {
      const { id, name, email, phone, password } = user;
      console.log('got here', id);
      this.postgres.query(
        'INSERT INTO users (id, name, email, password, phone)'
        + 'VALUES ($1, $2, $3, $4, $5);',
        [id, name, email, password, email]
      );
      return { id };
    }
    catch (error) {
      console.log('Error creating user', error);
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
      await this.postgres.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
      return true;
    }
    catch (error) {
      console.log('Error deleting users', error);
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
      const { id, email, name, phone, password } = update;
      console.log(this.update);
      await this.postgres.query(
        'UPDATE users SET id = $1, name = $2, email = $3, password = $4, phone = $5 WHERE id = $1;',
        [id, email, name, phone, password]
      );

      return { id };
    }
    catch (error) {
      console.log('Error updating user', error);
      return {};
    }
  }

}

module.exports = UserModel;
