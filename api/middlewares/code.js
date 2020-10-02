/* eslint-disable consistent-return */
import models from '../models';

const { Code } = models;

export const validateCode = async (req, res, next) => {
  const {
    code
  } = req.body;
  if (!code) {
    return res.status(400).send({ error: 'Code is required' });
  }

  if (code.length > 7 || code.length < 7) {
    return res.status(400).send({ error: 'code must be 6 number' });
  }
  const codeNum = code ? await Code.findOne({ where: { code } }) : null;
  if (codeNum) {
    return res.status(409).send({ error: 'code exists already' });
  }
  next();
};
