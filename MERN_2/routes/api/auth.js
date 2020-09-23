const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const router = express.Router();
const mongoose = require('mongoose');

// @route   GET api/users
// @desc    Tests users route
// @access  Public

//Middleware
const validUser = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'mySecretKey');
    req.user = decoded.user; //the diff here is we pass the user object so decoded.user
    //and if were assigning a value to the req.user so if requested it gives the decoded.user object used while signing
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
router.get('/', validUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(['-password']); //finds the user by the id included in the token (decoded.user.id)
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
