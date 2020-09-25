const Service = require('./service');
const SessionController = require('../controllers/session');

class SessionService extends Service {
  constructor(request, response) {
    super(request, response);
    this.controller = new SessionController();
  }

  async login(email, password) {
    console.log('logging in', email);
    const user = await this.controller.matchUser(email, password);
    const jwt = this.controller.generateJwt(user);
    return { jwt };
  }

  async verifyJwt(jwt) {
    return this.controller.verifyJwt(jwt);
  }

  async sessionMiddleware() {
    console.log('session middleware');
    try {
      const jwt = this.request.headers.authorization;
      if (await this.verifyJwt(jwt)) {
        return this.request.next();
      }
      else {
        return this.response.status(401).send({ message: 'unauthorized' });
      }
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = SessionService;
