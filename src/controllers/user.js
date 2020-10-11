const Controller = require('./controller');
const UserModel = require('../models/user');
const { encrypt } = require('../utils/encryption');

class UserController extends Controller {
  constructor(user) {
    super(UserModel, user);
  }

  /**
   * @param {string} id
   */
  async getPosts(id) {
    const user = await this.model.getPosts(id);

    if (!user) {
      this.logger.error({ id, user }, 'posts not found');
      return {};
    }
    return user;
  }

  /**
   * @param {string} id
   */
  async get(id) {
    const user = await this.model.Get(id);

    if (!user) {
      this.logger.error({ id, user }, 'user not found');
      return {};
    }
    return user;
  }

  /**
   *
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @param {string} phone
   *
   */
  async create(email, name, password, phone) {
    const hashedPassword = await encrypt(password);
    const user = new this.model(name, email, hashedPassword, phone);
    this.logger.info({ user });
    return this.model.Insert(user);
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    return this.model.Delete(id);
  }

  /**
   *
   * @param {string} id
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @param {string} phone
   *
   */

  async update(id, email, name, password, phone) {
    const update = new this.model(email, name);
    return this.model.update(id, update);
  }
}

module.exports = UserController;
