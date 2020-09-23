const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//../../client/node_modules/node_modules/express-validator
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

//anything that returns a promise put await infront

//Middleware
const validUser = (req, res, next) => {
  var token = req.header('x-auth-token');

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

//login route

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json('This email does not exists');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json('Please enter correct password');
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      //one of the jwt sign methods of call back to return err and token
      jwt.sign(payload, 'mySecretKey', { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

//register route

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 characters or more'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json('User already exists');
      }
      //get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      user = new User({
        name,
        email,
        password,
        avatar,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      //one of the jwt sign methods of call back to return err and token
      jwt.sign(payload, 'mySecretKey', { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
