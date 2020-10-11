const { jwt: jwtConfig } = require('config');
const jwt = require('jsonwebtoken');
const SessionModel = require('../models/session');
const UserController = require('./user');

const { privateKey, publicKey } = jwtConfig;

const Controller = require('./controller');

class SessionController extends Controller {
  constructor() {
    super(SessionModel);
    this.userController = new UserController();
  }

  matchUser(email, password) {
    return this.model.MatchUserLogin(email, password);
  }

  generateJwt(user) {
    return jwt.sign(user, privateKey, { algorithm: 'RS256' });
  }

  async verifyJwt(jwtToken) {
    try {
      const { id } = await jwt.verify(jwtToken, publicKey);
      const user = await this.userController.get(id);
      return !!user.id;
    }
    catch (error) {
      this.logger.error({ jwtToken, error }, 'error getting jwt token');
      return false;
    }
  }

  async parseJwt(jwtToken) {
    const { id, name, email, phone } = jwt.verify(jwtToken, publicKey);
    return { id, name, email, phone };
  }
}

module.exports = SessionController;
