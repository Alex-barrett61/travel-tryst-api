const Service = require('./service');
const CommentController = require('../controllers/comment');

class CommentService extends Service {
  constructor(...args) {
    super(...args);
    this.controller = new CommentController();
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
    const { body } = data;
    return this.controller.create(body);
  }

  async update(id, data) {
    const { body }= data;
    return this.controller.update(body,id);
  }

  async delete(id) {
    return this.controller.delete(id);
  }
}
  module.exports = CommentService;
