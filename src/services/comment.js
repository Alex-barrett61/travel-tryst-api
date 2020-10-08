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
    console.log('fetching comment by id', id);
    const comment = await this.controller.get(id);
    console.log('returning comment', comment);
    return comment;
  }

  async create(data) {
    const { body, postId } = data;
    return this.controller.create(body, this.user.id, postId);
  }

  async update(id, data) {
    const { userId } = await this.controller.getUserId(id);
    if (this.user.id === userId) {
      const { body } = data;
      return this.controller.update(body, id);
    }
    else {
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }

  async delete(id) {
    const { userId } = await this.controller.getUserId(id);
    if (this.user.id === userId) {
      return this.controller.delete(id);
    }
    else {
      return this.response.status(401).send({ message: 'unauthorized' });
    }
  }
}

module.exports = CommentService;
