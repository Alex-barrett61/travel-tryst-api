const Service = require('./service');
const PostController = require('../controllers/post');

class PostService extends Service {
  constructor(...args) {
    super(...args);
    this.controller = new PostController();
  }

  /**
   *
   * @param {string} id - the id of a single post
   * @returns {Promise<object>}
   */
  async get(id) {
    console.log('fetching post by id', id);
    const post = await this.controller.get(id);
    console.log('returning post', post);
    return post;
  }

  async create(data) {
    const { title, body } = data;
    return this.controller.create(title, body);
  }

  //async update(data) {

  //}
  async delete(id) {
    return this.controller.delete(id);
  }
}

module.exports = PostService;
