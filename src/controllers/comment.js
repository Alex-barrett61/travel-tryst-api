const Controller = require('./controller');
const CommentModel = require('../models/comment');

class CommentController extends Controller {
  constructor() {
    super(CommentModel);
  }

  /**
   * @param {string} id
   */
  async get(id) {
    const comment = await this.model.Get(id);

    if (!comment) {
      console.log('comment not found');
      return {};

    }

    return comment;

  }
  /**
   *
   * @param {string} body
   * @returns {Promise<void>}
   */
  async create(body) {
    const comment = new this.model( body);
    return this.model.Insert(comment);
  }
  /**
   *
   * @param {string} body
   * @param {string} id
   * @returns {Promise<void>}
   */

  async update( id, body) {
    const update = new this.model(body);
    return this.model.update(id, update);
  }
  /**
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    return this.model.Delete(id);
  }
}
module.exports = CommentController;
