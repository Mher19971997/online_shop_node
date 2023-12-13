const jwtService = require('../libs/shared/src/jwt/jwt.service');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwtService.jwtVerify(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' });
  }
};
