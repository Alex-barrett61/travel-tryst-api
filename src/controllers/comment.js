const Controller = require('./controller');
const CommentModel = require('../models/comment');

class CommentController extends Controller {
  constructor(user) {
    super(CommentModel, user);
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
   * @param {string} postId
   * @param {string} body
   * @param {string} userId
   */
  async create(body, userId, postId) {
    const comment = new this.model(body, userId, postId);
    return this.model.Insert(comment);
  }

  /**
   *
   * @param {string} body
   * @param {string} id
   *
   */

  async update(id, body) {
    const update = new this.model(body);
    return this.model.update(id, update);
  }

  /**
   *
   * @param {string} id
   */
  async delete(id) {
    return this.model.Delete(id);
  }

  /**
   * @param {string} id
   */
  async getUserId(id) {
    const userData = await this.model.GetUserId(id);

    if (!userData) {
      console.log('UserId not found');
      return {};
    }
    return userData;
  }
}

module.exports = CommentController;
