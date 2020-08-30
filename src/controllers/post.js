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
    console.log(post);
    const response = await this.model.Insert(post);
  }
}

module.exports = PostController;
