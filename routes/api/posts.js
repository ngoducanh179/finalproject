const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('./../../models/User');
const Post = require('./../../models/Post');
const { role, statusCustomer } = require('../../config/constant');
const Center = require('../../models/Center')
//@route    GET api/posts

// @desc    Test route

// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      let customer;
      let center;
      let avatar
      if (user) {
        switch (user.role) {
          case role.CUSTOMER:
            customer = await Customer.findOne({ user: user.id });
            avatar = customer.avatar;
            break;
          case role.CENTER:
            center = await Center.findOne({ user: user.id });
            avatar = center.avatar
            break;
          default:
            break;
        }

      }

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar,
        user: req.user.id,
        img: req.body.url || ''
      });

      const post = await newPost.save();
      res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/posts

// @desc    Get all post

// @access  private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/posts/:id

// @desc    Get post by ID

// @access  private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.json(post);
  } catch (e) {
    console.error(e.message);
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' });
    }
    // console.error(e.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/posts

// @desc    Get all post

// @access  private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check user
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    post.remove();

    res.json({ msg: 'post deleted' });
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

//@route    Put api/posts/like/:id

// @desc    like a post

// @access  private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console
      .log
      // post.likes.filter(like => like.user.toString() === req.user.id)
      ();
    // check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.json({ msg: 'Post already liked', code: 'liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

// @route    Put api/posts/unlike/:id

// @desc    unlike

// @access  private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    // check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.json({ msg: 'Post has not yet been liked' });
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'not found id of post' });
    }
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/posts/comment/:id

// @desc    comment on a post

// @access  private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      let customer;
      let center;
      let avatar
      if (user) {
        switch (user.role) {
          case role.CUSTOMER:
            customer = await Customer.findOne({ user: user.id });
            avatar = customer.avatar;
            break;
          case role.CENTER:
            center = await Center.findOne({ user: user.id });
            avatar = center.avatar
            break;
          default:
            break;
        }

      }
      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar,
        user: req.user.id,
        img: req.user.img
      });
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/posts/comment/:id

// @desc    comment on a post

// @access  private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    console.log(req.params.id, req.params.comment_id);
    const post = await Post.findById(req.params.id);
    // const comment = await findById(req.params.comment_id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'comment does not exits' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorized' });
    }
    const indexRemove = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(indexRemove, 1);

    await post.save();
    console.log(post.comments);
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
