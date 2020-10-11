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
    this.logger.info('fetching comments by id', id);

    const post = await this.controller.getComments(id);
    this.logger.info('returning comments');
    return post;
  }

  /**
   *
   * @param {string} id - the id of a single post
   * @returns {Promise<object>}
   */
  async get(id) {
    this.logger.info({ id }, 'fetching post by id');

    const post = await this.controller.get(id);
    this.logger.info({ post }, 'returning post');
    return post;
  }

  async create(data) {
    const { title, body } = data;
    this.logger.info({ title, body }, 'creating post');

    return this.controller.create(title, body, this.user.id);
  }

  async delete(id) {
    this.logger.info({ id }, 'deleting post');
    const { userId } = await this.controller.getUserId(id);

    this.logger.info({ userId, user: this.user.id });
    if (this.user.id === userId) {
      return this.controller.delete(id);
    }
    else {
      this.logger.error({ id }, 'unauthorized');
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }

  async update(id, data) {
    this.logger.info({ id, data }, 'updating post');
    const { userId } = await this.controller.getUserId(id);

    if (this.user.id === userId) {
      const { title, body, userId } = data;
      return this.controller.update(title, body, userId, id);
    }
    else {
      this.logger.error({ id, data }, 'unauthorized');
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }
}

module.exports = PostService;
