const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function getToken(user) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
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
};
