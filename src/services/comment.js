const Service = require('./service');
const CommentController = require('../controllers/comment');

class CommentService extends Service {
  constructor(...args) {
    super(...args);
    this.controller = new CommentController(this.user);
  }

  /**
   *
   * @param {string} id - the id of a single post
   * @returns {Promise<object>}
   */
  async get(id) {
    this.logger.info({ id }, 'fetching comment by id');

    const comment = await this.controller.get(id);
    this.logger.info({ comment }, 'returning comment');
    return comment;
  }

  async create(postId, data) {
    this.logger.info({ postId, data }, 'creating comment');
    const { body } = data;
    return this.controller.create(body, this.user.id, postId);
  }

  async update(id, data) {
    this.logger.info({ id, data }, 'updating comment');
    const { userId } = await this.controller.getUserId(id);
    if (this.user.id === userId) {
      const { body } = data;
      return this.controller.update(body, id);
    }
    else {
      this.logger.error({ id, data }, 'unauthorized');
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }

  async delete(id) {
    this.logger.info({ id }, 'deleting comment');
    const { userId } = await this.controller.getUserId(id);
    if (this.user.id === userId) {
      return this.controller.delete(id);
    }
    else {
      this.logger.error({ id }, 'unauthorized');
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }
}

module.exports = CommentService;
