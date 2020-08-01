const PostModel = require('../models/post');

class PostController {
  static Model = PostModel;

  /**
   * @param {string} id
   */
  static Get(id) {
    return this.Model.Get(id);
  }
}

module.exports = PostController;
