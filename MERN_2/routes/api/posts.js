const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const Profile = require('../../models/profile');
const Post = require('../../models/post');
const jwt = require('jsonwebtoken');
//middleware
const validUser = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'mySecretKey');
    req.user = decoded.user;
    //the diff here is we pass the user object so decoded.user
    //and if were assigning a value to the req.user so if requested it gives the decoded.user object used while signing
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// add post
router.post(
  '/',
  validUser,
  [check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id, //req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//get all posts

router.get('/', validUser, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //most recent
    res.json(posts);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//get post by id
router.get('/:id', validUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});

//delete a post by id
router.delete('/:id', validUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //check if the post belongs to the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});

//adding likes and unlike to post array

router.put('/like/:id', validUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post is already liked by the same user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});

//unlike
router.put('/unlike/:id', validUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post is already liked by the same user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    //get remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//post a comment

router.post(
  '/comment/:id',
  validUser,
  [check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id, //req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//delete a comment
//get the post id and then the comment id

router.delete('/comment/:id/:comment_id', validUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //take the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(400).json({ msg: 'There is no comment for this post' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    res.status(500).send('server error');
  }
});

module.exports = router;
