const Controller = require('./controller');
const PostModel = require('../models/post');

class PostController extends Controller {
  constructor() {
    super(PostModel);
  }

  /**
   * @param {string} id
   */
  async get(id) {
    const post = await this.model.Get(id);

    if (!post) {
      console.log('post not found');
      return {};
    }
    return post;
  }

  /**
   *
   * @param {string} title
   * @param {string} body
   * @returns {Promise<void>}
   */
  async create(title, body) {
    const post = new this.model(title, body, 'test', 'test');
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
   * @param {string} body
   * @param {string} id
   * @returns {Promise<void>}
   */

  async update(title, body,id) {
    const update = new this.model(title, body, 'test', 'test');
    return this.model.update(id, update);
  }
}
  module.exports = PostController;
