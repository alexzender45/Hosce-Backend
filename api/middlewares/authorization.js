import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

export const authorizeUsers = (req, res, next) => {
  // Check whether there's token in Authorization header of the request
  if (!req.headers.authorization && !req.headers['x-access-token']) {
    return res.status(401).json({ 
      status: 'error',
      error: 'Unauthorized access'
     });
  }
  const token = req.headers.authorization.split(' ')[1] || req.headers['x-access-token'].split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'Session Expired Login again',
         error: err 
        });
    }
    req.decoded = decoded;

    // Verify that the logged in user is in the database
    return User.findByPk(decoded.userId)
      .then((existingUser) => {
        if (!existingUser) return res.status(403).json({
           status: 'error',
           error: 'User doesn\'t exist'
           });
        return next();
      });
  });
};

export const authorizeAdmins = (req, res, next) => {
  if (req.decoded.role !== 'admin') {
    return res.status(401).json({
      status: 'error', 
      error: 'Unauthorized access' 
    });
  }
  return next();
};