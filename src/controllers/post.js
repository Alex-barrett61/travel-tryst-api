const Controller = require('./controller');
const PostModel = require('../models/post');

class PostController extends Controller {
  constructor() {
    super(PostModel);
  }
  /**
   * @param {string} id
   */
  async getComments(id) {
    const post = await this.model.getComments(id);

    if (!post) {
      console.log('comments not found');
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
      console.log('post not found');
      return {};
    }
    return post;
  }

  /**
   *
   * @param {string} title
   * @param {string} body
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async create(title, body,userId) {
    const post = new this.model(title, body, userId, 'test');
    console.log(post)
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
   * @returns {Promise<void>}
   */

  async update(title, body,userId,id) {
    const update = new this.model(title, body, userId, 'test');
    return this.model.update(id, update);
  }
}
  module.exports = PostController;
