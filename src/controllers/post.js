const PostModel = require('../models/post');

class PostController {
  static Model = PostModel;

  /**
   * @param {string} id
   */
  static async Get(id) {
    const post = await this.Model.Get(id);

    if (!post) {
      console.log('post not found');
      return {};
    }
    return post;
  }
}

module.exports = PostController;
