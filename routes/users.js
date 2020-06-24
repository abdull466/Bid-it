const moment = require('moment')

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const stripe = require('stripe')('sk_test_MuQleEH8TU53i1Dqzw590peM002c4Hrzs7', { apiVersion: '' });

const auth = require('../middleware/auth');

const Email = require('../email');

const User = require('../models/User');

const account = stripe.accounts.create({
  country: 'CA',
  type: 'custom',
  requested_capabilities: ['card_payments', 'transfers'],
});

// @route  POST api/users
// @desc   Register user route
// @access Public
router.post(
  '/',
  [
    check('fname', 'First Name is required').not().isEmpty(),
    check('lname', 'Last Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check(
      'password',
      'Password should be at least more than 6 characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //const image = req.body.image.split(' ').join('');
    const { fname, lname, email, mobile, country, city, password, image } = req.body;
    try {
      // See if user exists

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        fname,
        lname,
        email,
        mobile,
        country,
        city,
        password,
        image,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
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
router.get('/profile/', auth, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/myWallet/', auth, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    console.error("My balance : " + profile.balance);
    res.json({ balance: profile.balance, trans: profile.transactions, dp: profile.image, name: (profile.fname + " " + profile.lname) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/stripeSession', auth, async (req, res) => {

  console.log(JSON.stringify(req.body))
  var pkr = req.body.pkr * 100;
  stripe.prices.create(
    {
      unit_amount: pkr,
      currency: 'pkr',
      product: 'prod_HUMODiOT3EcHqA',
    },
    async function (err, price) {

      const sess = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: price.id,
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://web-bid-it.herokuapp.com/myWallet/card_payment/success/?PKR=' + pkr / 100 + "&FOR=" + req.body.for,
        cancel_url: 'https://web-bid-it.herokuapp.com/myWallet/card_payment/failed'
      });

      res.json(sess)
    }
  );
});

router.post('/walletOperations', auth, async (req, res) => {

  var date = new Date();
  var datetime = moment(date).format('llll');

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    console.log("Started")

    var total = 0;
    if (req.body.data.for === "Recharge") {
      total = parseFloat(user.balance) + parseFloat(req.body.data.amount)
    }
    else {
      total = parseFloat(user.balance) - parseFloat(req.body.data.amount)
    }
    console.log("Now Total : " + total)
    user.balance = total

    const data = {
      for: req.body.data.for,
      agent: req.body.data.agent,
      amount: req.body.data.amount,
      date: datetime
    }

    user.transactions.unshift(data)

    const reslt = await user.save();
    res.json(reslt)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/userInfo', auth, async (req, res) => {
  try {
    const profile = await User.findById(req.body.userId);
    console.log(req.body.userId);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    console.log('Email : ' + profile.email);
    res.json({ email: profile.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/profile/update', auth, async (req, res) => {
  const { fname, lname, email, mobile, country, city, image } = req.body;
  try {
    const fields = {};
    const response = await User.findById(req.user.id);
    if (fname) fields.fname = fname;
    if (lname) fields.lname = lname;
    if (email) fields.email = email;
    if (mobile) fields.mobile = mobile;
    if (country) fields.country = country;
    if (city) fields.city = city;
    if (image) fields.image = image;

    let updated_profile = await User.findByIdAndUpdate(
      req.user.id,
      { $set: fields },
      { new: true }
    );

    res.json(updated_profile);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE api/users/admin/users/:id
 * @desc Delete a user by admin
 * @access Private
 */
router.delete('/admin/users/:id', auth, async (req, res) => {
  try {
    const { id } = req.params

    if (id != req.user.id) {
      await User.findByIdAndDelete(id)
      res.json(id)
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.post('/admin/users/block/:id/:status', auth, async (req, res) => {
  try {
    const { id, status } = req.params
    if (id !== req.user.id) {
      const usr = await User.findById(id)
      if (status === "Block") {
        usr.status = "BLOCKED"
      }
      else if (status === "Unblock") {
        usr.status = ""
      }
      await usr.save();
      res.json(id)
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


module.exports = router;
