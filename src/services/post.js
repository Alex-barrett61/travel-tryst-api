const PostController = require('../controllers/post');

class PostService {
  static async Get(request, response) {
    const { id } = request.params;

    console.log('fetching post by id', id);
    const post = await PostController.Get(id);
    console.log('returning post', post);

    response.json(post);
  }
}

module.exports = PostService;
