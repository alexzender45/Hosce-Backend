/* eslint-disable consistent-return */
import models from '../models';
import { emailRegEx } from '../helpers';

const { User } = models;

export const validateSignUp = async (req, res, next) => {
  const {
    username, email, password, tel
  } = req.body;
  if (!emailRegEx.test(email)) {
    return res.status(400).json({ 
      status: 'error',
      error: 'invalid email address'
     });
  }
  if (!username) {
    return res.status(400).json({
      status: 'error', 
      error: 'username is required'
     });
  }
  if (!password) {
    return res.status(400).json({ 
      status: 'error',
      error: 'password is required'
     });
  }
  if (password.length < 8) {
    return res.status(400).json({
      status: 'error',
       error: 'password must be at least 8 characters'
       });
  }
  if (!tel) {
    return res.status(400).json({
       status: 'error',
       error: 'Tel number is required'
       });
  }
  // if (typeof tel !== 'number' || tel < 10000000) {
  //   return res.status(400).send({ error: 'Invalid tel number' });
  // }
  const userByEmail = email ? await User.findOne({ where: { email } }) : null;
  if (userByEmail) {
    return res.status(409).json({
       status: 'error',
       error: 'email exists already'
       });
  }
  const userByUsername = username ? await User.findOne({ where: { username } }) : null;
  if (userByUsername) {
    return res.status(409).send({ 
      status: 'error',
      error: 'username exists already'
     });
  }
  next();
};
