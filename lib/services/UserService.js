const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function getToken(user) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1 day' });
  return token;
}

module.exports = class UserService {
  static async insert({ username, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      username,
      passwordHash,
    });
    const token = getToken(user);

    return token;
  }

  static async signIn({ username, password = '' }) {
    try {
      const user = await User.getByUsername(username);
      if (!user) throw new Error('Invalid username');
      if (!bcrypt.compareSync(password, user.passwordHash)) throw new Error('Invalid password');
      const token = getToken(user);

      return token;
    } catch (error) {
      console.log(error);
      error.status(401);
      throw error;
    }
  }
};
