const { Router } = require('express');
const UserService = require('../services/UserService');
// const jwt = require('jsonwebtoken');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const token = await UserService.insert(req.body);
    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: 1000 * 60 * 60 * 24,
      })
      .json({ message: 'Account created successfully!' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
