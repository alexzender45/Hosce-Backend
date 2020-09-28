import jwt from 'jsonwebtoken';

export const createToken = ({ id, email, role }) => jwt.sign(
  { userId: id, email, role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
export const verifyToken = (token) => {
  const decoded = jwt.verify(
    token, process.env.JWT_SECRET, { expiresIn: '24h' }
  );
  return decoded;
};
