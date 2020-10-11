const Controller = require('./controller');
const PostModel = require('../models/post');

class PostController extends Controller {
  constructor(user) {
    super(PostModel, user);
  }

  /**
   * @param {string} id
   */
  async getComments(id) {
    const post = await this.model.getComments(id);

    if (!post) {
      this.logger.error({ id, post }, 'comments not found');
      return {};
    }
    return post;
  }

  /**
   * @param {string} id
   */
  async get(id) {
    const post = await this.model.Get(id);

    if (!post) {
      this.logger.error({ id, post }, 'post not found');
      return {};
    }
    return post;
  }

  /**
   *
   * @param {string} title
   * @param {string} body
   * @param {string} userId
   *
   */
  async create(title, body, userId) {
    const post = new this.model(title, body, userId, 'test');
    this.logger.info({ post });
    return this.model.Insert(post);
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
   * @param {string} title
   * @param {string} userId
   * @param {string} body
   * @param {string} id
   *
   */

  async update(title, body, userId, id) {
    const update = new this.model(title, body, userId, 'test');
    return this.model.update(id, update);
  }

  /**
   * @param {string} id
   */
  async getUserId(id) {
    const userData = await this.model.GetUserId(id);

    if (!userData) {
      this.logger.error('userId not found');
      return {};
    }
    return userData;
  }
}

module.exports = PostController;
