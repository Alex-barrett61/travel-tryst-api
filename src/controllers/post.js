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
}

module.exports = PostController;
