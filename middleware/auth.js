const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // 401 err = access denied
    return res.status(401).json({ msg: 'No token, atuhorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
