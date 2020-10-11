const Service = require('./service');
const SessionController = require('../controllers/session');
const { comparePasswords } = require('../utils/encryption');

class SessionService extends Service {
  constructor(request, response) {
    super(request, response);
    this.controller = new SessionController();
  }

  async login(email, password) {
    this.logger.info({ email }, 'logging in');
    let match;
    let user;

    try {
      user = await this.controller.matchUser(email);
      match = await comparePasswords(password, user.password);
    }
    catch (error) {
      this.logger.error({ error }, 'error logging in');
      return this.response.status(500).send({ message: 'login error' });
    }

    if (!match) {
      this.logger.error({ email }, 'unauthorized');
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
        this.logger.info({ user: this.request.user });
        return this.request.next();
      }
      else {
        this.logger.error('unauthorized');
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
