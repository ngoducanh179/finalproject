const express = require('express');
// const Profile = require('./../../models/Profile');
const moment = require('moment')
const Customer = require('../../models/Customer')
const Center = require('../../models/Center')
const router = express.Router();
const request = require('request');
const config = require('config');
const User = require('./../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('./../../middleware/auth');
const Post = require('./../../models/Post');
const { role, statusCustomer } = require('../../config/constant');
const _ = require('lodash');
const sendGrid = require('../../config/sendGrid')
router.get('/me', auth, async (req, res) => {
  try {
    let profile
    if (req.role === role.CUSTOMER) {
      profile = await Customer.findOne({
        user: req.user.id
      }).populate('user', ['name', 'email', 'phone']).populate('history.centerId', ['centerName']);
    } else {
      profile = await Center.findOne({
        user: req.user.id
      }).populate('customerUsed.userId', ['name'])
    }

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user'
      });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route    POST api/profile

// @desc    Create or update user profile

// @access  private

router.post(
  '/',
  [
    auth,
    [
      check('sex', 'sex is required')
        .not()
        .isEmpty(),
      check('hobies', 'hobies is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      fromWhere,
      bio,
      sex,
      dateOfBirth,
      hobies,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      workedAt,
      workerFrom,
      workerTo,
      avatar
    } = req.body;
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (fromWhere) profileFields.fromWhere = fromWhere;
    if (bio) profileFields.bio = bio;
    if (sex) profileFields.sex = sex;
    if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
    if (avatar) {
      profileFields.avatar = avatar;
    } else {
      profileFields.avatar = 'https://www.computerhope.com/jargon/g/guest-user.jpg';
    }


    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    // build workedAt object
    profileFields.workedAt = {};
    profileFields.status = statusCustomer.PROFILED;
    if (workedAt) profileFields.workedAt.where = workedAt;
    if (workerFrom) profileFields.workedAt.from = workerFrom;
    if (workerTo) profileFields.workedAt.to = workerTo;

    try {
      let customer = await Customer.findOne({
        user: req.user.id
      });
      //create

      if (!customer) {
        if (hobies) {
          profileFields.hobies = hobies.split(',').map(hobie => hobie.trim());
        }
        profileFields.updateAt = new Date();
        customer = new Customer(profileFields);

        await customer.save();
        res.json(customer);
      }

      // update
      if (customer) {
        
        profileFields.updateAt = new Date();
        customer = await Customer.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          },

          err => {
            console.log('something wrong when updating data');
          }
        );
        return res.json(customer);
      }

      // create
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route    GET api/profile

// @desc    GET all profile

// @access  public

router.get('/', async (req, res) => {
  try {
    let profiles;
    const textSearch = req.query.query
    if (!_.isEmpty(textSearch)) {
      profiles = await Customer.find({ $text: { $search: textSearch } }).populate('user', ['name', 'email']);
    } else {
      profiles = await Customer.find().populate('user', ['name', 'email'])
    }
    totalCount = await Customer.countDocuments()
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      msg: 'server Error'
    });
  }
});


//@route    POST api/profile/user/:user_id

// @desc    Get profile by user id

// @access  public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Customer.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'email']).populate('history.centerId', ['centerName']);
    if (!profile)
      return res.status(400).json({
        msg: 'there no profile for this user'
      });
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'profile not found'
      });
    }
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

//@route    Delete api/profile

// @desc    Delete profile ,user &post

// @access  private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove users posts
    //Remove profile
    const profile = await Profile.findOne({
      user: req.user.id
    });
    await Profile.findOneAndRemove({
      _id: profile._id
    });
    //Remove user
    await User.findOneAndRemove({
      _id: req.user.id
    });
    await Post.deleteMany({ user: req.user.id });

    res.json({
      msg: 'User deleted'
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

//@route    PUT api/profile/experience

// @desc    Add profile experience

// @access  private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('company', 'company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).send('server error');
    }
  }
);

//@route    DELETE api/profile/education:edu_id

// @desc    Delete experience from profile

// @access  private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    //get remove index
    const removeIndex = profile.experience
      .map(item => {
        item.id;
      })
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('server error');
  }
});

// @route    PUT api/profile/experience

// @desc    Add profile experience

// @access  private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required')
        .not()
        .isEmpty(),
      check('degree', 'Deree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).send('server error');
    }
  }
);

// //@route    DELETE api/profile/experience:exp_id

// // @desc    Delete experience from profile

// // @access  private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    //get remove index
    const removeIndex = profile.education
      .map(item => {
        item.id;
      })
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('server error');
  }
});

// //@route    GET api/profile/github/username

// // @desc    Get user from Github

// // @access  public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'githubClientId'
        )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {
        'User-Agent': 'node.js'
      }
    };
    request(options, (error, Response, body) => {
      if (error) console.error(error);
      if (Response.statusCode !== 200) {
        return res.status(400).json({
          msg: 'No github found'
        });
      }
      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send('server error');
  }
});




// get all centers

router.get('/centers', async (req, res) => {
  try {
    let centers;
    const textSearch = req.query.query
    if (!_.isEmpty(textSearch)) {
      centers = await Center.find({ $text: { $search: textSearch } }).populate('user', ['name', 'email']);
    } else {
      centers = await Center.find().populate('user', ['name', 'email'])
    }
    res.json(centers);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

// get center

router.get('/center/:center_id', async (req, res) => {
  try {
    const center = await Center.findOne({
      _id: req.params.center_id
    }).populate('user', ['name', 'email', 'phone']);
    if (!center)
      return res.status(400).json({
        msg: 'there no center for this user'
      });
    res.json(center);
  } catch (e) {
    console.error(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'profile not found'
      });
    }
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

// get center

router.get('/center/price/:center_id', async (req, res) => {
  try {
    const sports = await Center.findOne({
      _id: req.params.center_id
    }).select('sports');
    if (!sports)
      return res.status(400).json({
        msg: 'there no center for this user'
      });
    res.json(sports);
  } catch (e) {
    console.error(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'profile not found'
      });
    }
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

// Booking

router.post('/center/booking/:sport/:userId/:centerId/', async (req, res) => {
  try {
    const { from, to, price, note } = req.body
    const booking = {
      userId: req.params.userId,
      from,
      to,
      price,
      kindOfSport: req.params.sport,
      status: 'pending',
      note,
    }
    const bookingUser = {
      centerId: req.params.centerId,
      from,
      to,
      price,
      kindOfSport: req.params.sport,
      status: 'pending',
      note
    }
    const center = await Center.findOne({
      _id: req.params.centerId
    }).populate('user', ['name', 'email'])
    const customer = await Customer.findOne({
      user: req.params.userId
    }).populate('user', ['name', 'email'])
    await sendGrid(`${customer.user.name} Đã Đặt Lịch Vào Từ ${moment(from).format('YYYY/MM/DD')} Đến Ngày ${moment(to).format('YYYY/MM/DD')} Và Đang Ở Trạng Thái Pending`, [
      {
        email: center.user.email,
        name: center.user.name
      },
      {
        email: customer.user.email,
        name: customer.user.name
      }
    ])
    center.customerUsed.unshift(booking);
    customer.history.unshift(bookingUser)
    await center.save()
    await customer.save()
    if (!center || !customer)
      return res.status(400).json({
        msg: 'Không Thể Đặt Lịch'
      });
    res.json({ msg: 'Đặt Lịch Thành Công' });
  } catch (e) {
    console.error(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'profile not found'
      });
    }
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

// get center

router.post('/center/order/:centerId/:orderId', async (req, res) => {
  try {
    const center = await Center.findOne({
      _id: req.params.centerId
    })
    let orderConfirm = center.customerUsed.find(x => x._id.toString() === req.params.orderId);
    const customer = await Customer.findOne({
      user: orderConfirm.userId
    }).populate('user', ['name', 'email'])

    const orderConfirmCustomer = customer.history.find(y => {
      return y.from.toString() == orderConfirm.from && y.to.toString() == orderConfirm.to && y.price.toString() == orderConfirm.price && y.kindOfSport.toString() == orderConfirm.kindOfSport && y.note.toString() == orderConfirm.note
    });
    if (!center || !customer)
      return res.status(400).json({
        msg: 'there no center for this user'
      });
    await Center.update({ 'customerUsed._id': req.params.orderId }, {
      '$set': {
        'customerUsed.$.status': req.body.status,
      }
    })

    await Customer.update({ 'history._id': orderConfirmCustomer._id }, {
      '$set': {
        'history.$.status': req.body.status,
      }
    })

    await sendGrid(`${customer.user.name} Phòng Tập Đã Xác Nhận lịch tập đã đặt Vào ${moment(orderConfirmCustomer.from).format('YYYY/MM/DD')} Đến Ngày ${moment(orderConfirmCustomer.to).format('YYYY/MM/DD')} Và Đang Ở Trạng Thái Confirm và Chờ ${customer.user.name} đến và sử dụng dịch vụ`, [
      {
        email: customer.user.email,
        name: customer.user.name
      }
    ])
    res.json({
        msg: 'Update Trạng Thái Thành Công'
      });
  } catch (e) {
    console.error(e.message);
    if (e.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'profile not found'
      });
    }
    res.status(500).json({
      msg: 'server Error'
    });
  }
});

module.exports = router;
