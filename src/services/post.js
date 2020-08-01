const PostController = require('../controllers/post');

class PostService {
  static async Get(request, response) {
    const { id } = request.params;
    response.json(await PostController.Get(id));
  }
};

module.exports = PostService;
