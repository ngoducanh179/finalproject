const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Customer = require('../../models/Customer')
const Center = require('../../models/Center')
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash')
const constant = require('../../config/constant')
//@route    POST api/users

// @desc    Test route

// @access  Public

// create user
router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more character'
    ).isLength({ min: 6 }),
    check('role', 'role is invalid').not().isEmpty(),
    check('location','location is invalid').optional(),
    check('website','website is invalid').optional(),
    check('sports','sports is invalid').optional(),
    check('social','social is invalid').optional(),
    check('bio','bio is invalid').optional(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, password, role, location, sports, bio, social, website } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!_.isEmpty(user)) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      // See if user exists
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        role
      });
      // Get users gravatar

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Encrypt password

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
          res.json({ token, role });
        }
      );
      // Return jsonwebtoken
      switch (role) {
        case constant.role.CUSTOMER:
          if(!_.isEmpty(location?.longitude) && !_.isEmpty(location?.latitude) && !_.isEmpty(location?.address)) {
            customer = new Customer({
              user: user.id,
              location,
            })
          await customer.save();
          }
          break;
        case constant.role.CENTER:
          if(!_.isEmpty(location?.longitude) && !_.isEmpty(location?.latitude) && !_.isEmpty(location?.address)) {
            center = new Center({
              user: user.id,
              website,
              sports,
              location,
              bio,
              social,
              status: constant.statusCenter.REGISTER,
            })
          await center.save();
          }
          break;
        default:
          res.status(400).json({ errors: [{ msg: 'role is not define' }] });
          break;
      }
    } catch (err) { 
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
