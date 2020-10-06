const Model = require('./model');

class SessionModel extends Model {
  constructor() {
    super('session');
  }

  static async MatchUserLogin(email) {
    try {
      const rows = await this.postgres.query(
        'SELECT id, name, email, phone, password FROM users WHERE email = $1;',
        [email]
      );
      return rows[0];
    }
    catch (error) {
      console.log('Error logging in', error);
      return {};
    }
  }
}

module.exports = SessionModel;
