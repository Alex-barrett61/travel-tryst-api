const Service = require('./service');
const SessionController = require('../controllers/session');
const { comparePasswords } = require('../utils/encryption');

class SessionService extends Service {
  constructor(request, response) {
    super(request, response);
    this.controller = new SessionController();
  }

  async login(email, password) {
    this.logger.info('logging in', email);
    const user = await this.controller.matchUser(email);
    const match = await comparePasswords(password, user.password);
    if (!match) {
      return this.response.status(401).send({ message: 'invalid credentials' });
    }
    const jwt = this.controller.generateJwt(user);
    return { jwt };
  }

  async verifyJwt(jwt) {
    return this.controller.verifyJwt(jwt);
  }

  async parseJwt(jwt) {
    return this.controller.parseJwt(jwt);
  }

  async sessionMiddleware() {
    this.logger.info('session middleware');
    try {
      const jwt = this.request.headers.authorization;
      if (await this.verifyJwt(jwt)) {
        this.request.user = await this.parseJwt(jwt);
        return this.request.next();
      }
      else {
        return this.response.status(401).send({ message: 'unauthorized' });
      }
    }
    catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = SessionService;
