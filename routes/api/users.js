const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Customer = require('../../models/Customer')
const Center = require('../../models/Center')
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash')
const constant = require('../../config/constant');
const removeVietnameseTones = require('../../config/vnToEn')
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
    check('location', 'location is invalid').optional(),
    check('website', 'website is invalid').optional(),
    check('sports', 'sports is invalid').optional(),
    check('social', 'social is invalid').optional(),
    check('bio', 'bio is invalid').optional(),
    check('phone', 'phone is invalid').not().isEmpty(),
    check('confirm', 'confirm is invalid').not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { name, email, password, role, location, sports, bio, social, website, phone, confirm } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!_.isEmpty(user)) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      let userPhone = await User.findOne({ phone });
      if (!_.isEmpty(userPhone)) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      const search = removeVietnameseTones(name);


      user = new User({
        name,
        email,
        password,
        role,
        phone,
        confirm,
      });

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
          if (location?.longitude && location?.latitude && !_.isEmpty(location?.address)) {
            customer = new Customer({
              user: user.id,
              location,
              status: constant.statusCustomer.REGISTERED,
              search
            })
            await customer.save();
          }
          break;
        case constant.role.CENTER:
          if (location?.longitude && location?.latitude && !_.isEmpty(location?.address)) {
            center = new Center({
              user: user.id,
              website,
              sports,
              location,
              bio,
              social,
              status: constant.statusCustomer.REGISTERED,
              search,
            })
            await center.save();
          }
          break;
        default:
          return res.status(400).json({ errors: [{ msg: 'role is not define' }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
