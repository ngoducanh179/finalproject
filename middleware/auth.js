const jwt = require('jsonwebtoken');

const config = require('config');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  const role = req.header('role');
  //check if not token
  
  if (!token) {
    return res.status(400).json({ msg: 'authorization denied' });
  }

  //Verify token

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    const user = await User.findById(req.user.id)
    if(!user.confirm) {
      return res.status(400).json({ msg: 'user chưa confirm số điện thoại' });
    }
    req.role = role;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
