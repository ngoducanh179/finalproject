const express = require('express');
const User = require('./../../models/User');
const router = express.Router();
const auth = require('./../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
//@route    GET api/auth

// @desc    Test route

// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/auth

// @desc    Authenticate user & get token

// @access  Public
router.post(
  '/',
  [
    check('email', 'Không Được Để Trống Email').isEmail(),
    check('password', 'Không Được Để Trống Mật Khẩu').exists().not().isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { email, password, role } = req.body;
    try {
      let user = await User.find({ email, role });
      user = user[0];
      console.log(user);
      if (!user) {
        res.status(400).json({ errors: [{ msg: 'Tài Khoản Không Tồn Tại' }] });
      }
      // See if user exists
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: 'Mật Khẩu Không Chính Xác' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, role: user.role });
        }
      );
      // Return jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

module.exports = router;
