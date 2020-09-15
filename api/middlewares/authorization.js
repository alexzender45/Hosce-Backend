import jwt from 'jsonwebtoken';
import models from '../models';
import verifyToken from '../helpers/jwt'

const { User } = models;

export const authorizeUsers = (req, res, next) => {
  // Check whether there's token in Authorization header of the request
  if (!req.headers.authorization && !req.headers['x-access-token']) {
    return res.status(401).send({ error: 'Unauthorized access' });
  }
  const token = req.headers.authorization.split(' ')[1] || req.headers['x-access-token'].split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: err });
    }
    req.decoded = decoded;

    // Verify that the logged in user is in the database
    return User.findByPk(decoded.userId)
      .then((existingUser) => {
        if (!existingUser) return res.status(403).send({ error: 'User doesn\'t exist' });
        return next();
      });
  });
};

export const authorizeAdmins = (req, res, next) => {
  console.log(req.decoded.role)
  if (req.decoded.role !== 'admin') {
    return res.status(401).send({ error: 'Unauthorized access' });
  }
  return next();
};