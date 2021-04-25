const express = require('express');
const Center = require('../../models/Center')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('./../../middleware/auth');
const { role, statusCustomer } = require('../../config/constant');
const _ = require( 'lodash');

// tạo profile cho center

router.post(
    '/',
    [
      auth,
      [
        check('centerName', 'centerName is required')
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
        from,
        centerName,
        bio,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        website,
        sports,
        avatar
      } = req.body;
      //Build profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (from) profileFields.from = from;
      if (bio) profileFields.bio = bio;
      if (website) profileFields.website = website;
      if (centerName) profileFields.centerName = centerName;
      if (avatar) {
        profileFields.avatar = avatar;
      } else {
        profileFields.avatar = 'https://www.computerhope.com/jargon/g/guest-user.jpg';
      }
      if(sports) {
        profileFields.sports = sports;
      }
  
  
      // build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
      profileFields.status = statusCustomer.PROFILED;
      try {
        let center = await Center.findOne({
          user: req.user.id
        });
        //create
  
        if (!center) {
          profileFields.updateAt = new Date();
          center = new Center(profileFields);
  
          await center.save();
          res.json(center);
        }
  
        // update
        if (center) {
          profileFields.updateAt = new Date();
          center = await Center.findOneAndUpdate(
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
  
          return res.json(center);
        }
  
        // create
      } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
      }
    }
  );

  module.exports = router;