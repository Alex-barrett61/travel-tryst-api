const Service = require('./service');
const UserController = require('../controllers/user');

class UserService extends Service {
  constructor(...args) {
    super(...args);
    this.controller = new UserController();
  }

  /**
   *
   * @returns {Promise<object>}
   * @param id
   */
  async getPosts(id) {
    console.log('fetching posts by id',);
    const user = await this.controller.getPosts(id);
    console.log('returning user', user);
    return id;
  }
  async get(id) {
    console.log('fetching user by id', id);
    const user = await this.controller.get(id);
    console.log('returning user', user);
    return user;
  }
  async create(data) {
    const { email, name, password, phone } = data;
    return this.controller.create(email, name, password, phone);
  }
  async delete(id) {
  return this.controller.delete(id);
}
  async update(id, data) {
    const { email, name, password, phone }= data;
    return this.controller.update(email, name, password, phone,id);
  }

}
module.exports = UserService;
