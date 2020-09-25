const Model = require('./model');

class SessionModel extends Model {
  constructor() {
    super('session');
  }

  static async MatchUserLogin(email, password) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, name, email, phone FROM users WHERE email = $1 AND password = $2;',
        [email, password]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error getting comments', error);
      return {};
    }
  }
}

module.exports = SessionModel;
