const Service = require('./service');
const PostController = require('../controllers/post');

class PostService extends Service {
  constructor(...args) {
    super(...args);
  }

  /**
   *
   * @param {string} id - the id of a single post
   * @returns {Promise<object>}
   */
  async get(id) {
    console.log('fetching post by id', id);
    const post = await PostController.Get(id);
    console.log('returning post', post);
    return post;
  }
}

module.exports = PostService;
