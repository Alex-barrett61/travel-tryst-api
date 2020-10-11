const Service = require('./service');
const UserController = require('../controllers/user');
const logger = require('../utils/logger');


class UserService extends Service {
  constructor(...args) {
    super(...args);
    this.controller = new UserController(this.user);
  }

  /**
   *
   * @returns {Promise<object>}
   * @param id
   */
  async getPosts(id) {
    this.logger.info('fetching posts by id');
    const user = await this.controller.getPosts(id);
    console.log({ id, user }, 'returning user');
    return id;
  }

  async get(id) {
    this.logger.info({ id }, 'fetching user by id');
    const user = await this.controller.get(id);
    this.logger.info({ user }, 'returning user');
    return user;
  }

  async create(data) {
    const { email, name, password, phone } = data;
    return this.controller.create(email, name, password, phone);
  }

  async delete(id) {
    if (this.user.id === id) {
      return this.controller.delete(id);
    }
    else {
      this.logger.error({ id }, 'unauthorized');
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }

  async update(id, data) {
    if (this.user.id === id) {
      const { email, name, password, phone } = data;
      return this.controller.update(email, name, password, phone, id);
    }
    else {
      this.logger.error({ id, data }, 'unauthorized');
      return this.response.status(401).send({ message: 'unauthorized' });
    }

  }
}

module.exports = UserService;
