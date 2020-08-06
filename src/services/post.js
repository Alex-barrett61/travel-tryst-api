const Service = require('./service');
const PostController = require('../controllers/post');

class PostService extends Service {
  constructor(...args) {
    super(...args);
  }

  async get() {
    const { id } = this.request.params;

    console.log('fetching post by id', id);
    const post = await PostController.Get(id);
    console.log('returning post', post);

    this.response.json(post);
  }
}

module.exports = PostService;
