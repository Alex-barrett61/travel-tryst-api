const Controller = require('./controller');
const UserModel = require('../models/user');

class UserController extends Controller {
  constructor() {
    super(UserModel);
  }

  /**
   * @param {string} id
   */
  async getPosts(id) {
    const user = await this.model.getPosts(id);

    if (!user) {
      console.log('posts not found');
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
      console.log('user not found');
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
  async create(email, name, password, phone)  {
    const user = new this.model(email, name, password, phone);
    console.log(user)
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
    return this.model.update(id,update);
  }
}

  module.exports = UserController;
