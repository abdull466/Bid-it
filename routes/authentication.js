const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Code = require('../models/Code')
const User = require('../models/User');

const Email = require('../email')





router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get("/currUser", auth, function (req, res) {
  res.json({ usr: req.user });
})
//send code

router.post('/send/code', async (req, res) => {

  var verificationcode = Math.floor(
    Math.random() * (99999 - 10000 + 1) + 10000
  );

  verificationcode = verificationcode.toString()
  try {

    const ncode = new Code({
      email: req.body.email,
      code: verificationcode

    });

    Email(req.body.email, verificationcode)

    await ncode.save()
    res.json(verificationcode);

  } catch (error) {

  }

})

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      if (isMatch && user.status === "BLOCKED") {
        return res
          .status(400)
          .json({ errors: [{ msg: 'You have Been Blocked By ADMIN' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.get('/getall/profiles', auth, async (req, res) => {
  try {

    const users = await User.find();
    res.json(users.filter(user => user._id != req.user.id));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
