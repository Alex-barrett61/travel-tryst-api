const Service = require('./service');
const PostController = require('../controllers/post');

class PostService extends Service {
  constructor(...args) {
    super(...args);
    this.controller = new PostController(this.user);
  }

  /**
   *
   * @param {string} id - the id of a single post
   * @returns {Promise<object>}
   */
  async getComments(id) {
    console.log('fetching comments by id', id);
    const post = await this.controller.getComments(id);
    console.log('returning comments');
    return post;
  }

  /**
   *
   * @param {string} id - the id of a single post
   * @returns {Promise<object>}
   */
  async get(id) {
    console.log('fetching post by id', id);
    const post = await this.controller.get(id);
    console.log('returning post', post);
    return post;
  }

  async create(data) {
    const { title, body } = data;
    return this.controller.create(title, body, this.user.id);
  }

  async delete(id) {
    const { userId } = await this.controller.getUserId(id);
    console.log({ userId, user: this.user.id });
    if (this.user.id === userId) {
      return this.controller.delete(id);
    }
    else {
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }

  async update(id, data) {
    const { userId } = await this.controller.getUserId(id);
    if (this.user.id === userId) {
      const { title, body, userId } = data;
      return this.controller.update(title, body, userId, id);
    }
    else {
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }
}

module.exports = PostService;
