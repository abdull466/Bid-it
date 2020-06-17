const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Ad = require("../models/Ad");
const User = require("../models/User");
const Catagory = require('../models/Catagory');

// @route  Post api/ads
// @desc   Create a Ad
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
      check("minbid", "Min Bid Price is required").not().isEmpty(),
      check("start", "Start date is required").not().isEmpty(),
      check("end", "End date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //console.log("LISt: " + req.body.image)

    try {
      const user = await User.findById(req.user.id);
      const usrRating = user.OverAllRating
      var image = req.body.image

      const newAd = new Ad({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        minbid: req.body.minbid,
        start: req.body.start,
        end: req.body.end,
        image: image,
        category: req.body.category,
        userRating: usrRating,
        user: req.user.id,
      });
      const ad = await newAd.save();
      res.json(ad);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post('/donePayment', async (req, res) => {
  try {
    const payId = req.body.id
    const ad = await Ad.findById(payId);
    ad.ispayment = true
    await ad.save();
    res.json("")
  } catch (error) {
    res.status(500).send(error.message);
  }
})

//create catagory 

router.post('/admin/create/category', async (req, res) => {
  try {
    const catagory = new Catagory({
      title: req.body.title,
      active: true
    })

    const response = await catagory.save();
    res.json(response)
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// @route  Get api/ads
// @desc   Get all ads
// @access Public
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find({ status: false }).sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//fetch/catagories

router.get("/fetch/catagories", async (req, res) => {
  try {
    const catagories = await Catagory.find({ active: true });
    res.json(catagories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/admin/fetch/all", async (req, res) => {
  try {
    const ads = await Ad.find().sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/admin/fetch/all/today", async (req, res) => {
  try {
    const ads = await Ad.find({ "start": { "$match": new Date() } }).sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// fetch adds of specific user
router.get("/fetch", auth, async (req, res) => {
  try {
    const ads = await Ad.find({ user: req.user.id }).sort({ data: -1 });
    // const ads = await Ad.find().sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/fetch/approved", auth, async (req, res) => {
  try {
    const ads = await Ad.find({
      $and: [{ issued_to: req.user.id }, { status: true }],
    });
    // const ads = await Ad.find({user:req.user.id.toString(),issued_to:req.user.id,status:true}).sort({data:-1})
    // const ads = await Ad.find().sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/fetch/completed", auth, async (req, res) => {
  try {
    const ads = await Ad.find({
      $and: [{ user: req.user.id }, { status: true }],
    });
    // const ads = await Ad.find({user:req.user.id.toString(),issued_to:req.user.id,status:true}).sort({data:-1})
    // const ads = await Ad.find().sort({ date: -1 });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  Get api/ads/:id
// @desc   Get single ad
// @access Public


router.post("/myAd/", function (req, res) {

  const id = req.body.params
  console.log(id)
  Ad.findById({ _id: req.body.params }, function (err, result) {
    try {
      if (!result) {
        return res.status(404).json({ msg: "Ad not found" });
      }
      res.json({ allResult: result, bidsL: result.bids.length, bds: result.bids });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Ad not found" });
      }
      res.status(500).send("Server Error");
    }
  });
})


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const ad = await Ad.find({ user: id }).sort({ end: -1 });
    if (!ad) {
      return res.status(404).json({ msg: "Ad not found" });
    }
    res.json(ad[0]);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ad not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  Delete api/ads/:id
// @desc   Delete single ad
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ msg: "Ad not found" });
    }

    // Check user
    if (ad.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await ad.remove();

    res.json({ msg: "Ad removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ad not found" });
    }
    res.status(500).send("Server Error");
  }
});

//update add

router.put("/close/done/:id", auth, async (req, res) => {
  const { closebid } = req.body;

  //Build Contact Object

  const AdFields = {};

  if (closebid) AdFields.closebid = closebid;

  try {
    let contact = Ad.findById(req.params.id);

    if (!contact) return res.sendStatus(401).json({ msg: "no ad found" });

    contact = await Ad.findByIdAndUpdate(
      req.params.id,
      { $set: { closebid: req.body.closebid } },
      { new: true }
    );

    if (contact) {
      return res.json(contact);
    } else {
      return res.json({ status: 201 });
    }
  } catch (error) {
    console.error(error.message);
    res.send(404).json({ err: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, description, start, end, minbid, address } = req.body;

  //Build Contact Object

  const AdFields = {};

  if (title) AdFields.title = title;
  if (description) AdFields.description = description;
  if (start) AdFields.start = start;
  if (end) AdFields.end = end;
  if (minbid) AdFields.minbid = minbid;
  if (address) AdFields.address = address;

  try {
    let contact = Ad.findById(req.params.id);

    if (!contact) return res.sendStatus(401).json({ msg: "no ad found" });

    contact = await Ad.findByIdAndUpdate(
      req.params.id,
      { $set: AdFields },
      { new: true }
    );

    return res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.send(404).json({ err: "Server error" });
  }
});

router.put("/bid/approve/:id/:bidid/:user/:price", auth, async (req, res) => {
  try {
    const ad_id = req.params.id;
    const user = req.params.user;
    const price = req.params.price;
    const bidid = req.params.bidid;

    let ad = await Ad.findById(ad_id);

    ad.bids.filter(
      (bid) => (bid.status = bid._id.toString() === bidid ? true : bid.status)
    );

    /*
        a   = approve true 1
        b   = approve  2
        c   = approve 3
 
    */

    ad.bids.filter(
      (bid) => (bid.status = bid.status === true && bid._id.toString() !== bidid ? false : bid.status)
    );




    await ad.save();

    const newData = {
      issued_to: user,
      issued_price: price,
      status: true,
      closebid: true,
    };

    let newad = await Ad.findByIdAndUpdate(
      ad_id,
      { $set: newData },
      { new: true }
    );

    res.json(newad);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/bid/revert/:id/:bidid/:user/:price", auth, async (req, res) => {
  try {
    const ad_id = req.params.id;
    const user = req.params.user;
    const price = req.params.price;
    const bidid = req.params.bidid;
    let ad = await Ad.findById(ad_id);
    ad.bids.filter(
      (bid) => (bid.status = bid._id.toString() === bidid ? false : bid.status)
    );

    //already approved 

    /*
        a   = approve
        b   = revert
        c   = approve
 
    */

    await ad.save();
    const newData = {
      issued_to: "",
      issued_price: "",
      status: false,
      closebid: false,
    };

    let newad = await Ad.findByIdAndUpdate(
      ad_id,
      { $set: newData },
      { new: true }
    );

    res.json(newad);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



// @route  Post api/ads/comment/:id
// @desc   Comment on a Ad
// @access Private

router.post(
  "/AditionalFeedback/:id",
  [auth],
  async (req, res) => {
    console.log("ADDITIONAL FEDDBACK REQUEST...")
    const { feedback } = req.body;
    console.log("User : " + req.user.id)
    console.log("Ad : " + req.params.id)
    console.log("FeedBAck : " + feedback)

    try {
      const user = await User.findById(req.user.id).select("-password");

      const ad = await Ad.findById(req.params.id);

      const newComment = {
        text: feedback,
        firstname: user.fname,
        user: req.user.id,
      };
      ad.aditionalFeedback.unshift(newComment);
      // console.log("Total-Ratings : " + ratings)
      // console.log("Count : " + total)
      await ad.save();
      res.json(ad.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/feedback/:id",
  [auth],
  async (req, res) => {

    const { feedback, rating } = req.body;
    console.log("User : " + req.user.id)
    console.log("Ad : " + req.params.id)

    try {
      const user = await User.findById(req.user.id).select("-password");

      const ad = await Ad.findById(req.params.id);
      const adOwnerId = ad.user
      const adOwner = await User.findById(adOwnerId);

      const newComment = {
        text: feedback,
        rating: rating,
        firstname: user.fname,
        user: req.user.id,
      };

      const ownerRating = {
        Rating: rating,
        Ad: req.params.id,
        By: req.user.id
      }

      ad.comments.unshift(newComment);

      adOwner.Ratings.unshift(ownerRating);


      var ratings = [];
      var total = 0;
      adOwner.Ratings.map(e => {
        ratings.push(e.Rating)
        total = total + parseFloat(e.Rating)
      })

      var myratings = [];
      var total1 = 0;
      adOwner.myRating.map(e => {
        myratings.push(e.rating)
        total1 = total1 + parseFloat(e.rating)
      })

      var rat = (total + total1) / (adOwner.Ratings.length + adOwner.myRating.length)
      // console.log("Total-Ratings : " + ratings)
      // console.log("Count : " + total)

      adOwner.OverAllRating = rat;
      await Ad.update(
        { "user": adOwnerId },
        { $set: { "userRating": adOwner.OverAllRating } },
        { multi: true });

      await ad.save();
      await adOwner.save();
      res.json(ad.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/rateBackUser",
  [auth],
  async (req, res) => {
    try {
      const user = await User.findById(req.body.user).select("-password");
      const ad = await Ad.findById(req.body.ad);


      const data = {
        user: req.user.id,
        ad: req.body.ad,
        rating: req.body.rating
      }

      user.myRating.unshift(data)
      ad.isRatedBack = true

      await user.save();
      await ad.save();

      var ratings = [];
      var total = 0;
      user.Ratings.map(e => {
        ratings.push(e.Rating)
        total = total + parseFloat(e.Rating)
      })

      var myratings = [];
      var total1 = 0;
      user.myRating.map(e => {
        myratings.push(e.rating)
        total1 = total1 + parseFloat(e.rating)
      })

      var rat = (total + total1) / (user.Ratings.length + user.myRating.length)
      // console.log("Total-Ratings : " + ratings)
      // console.log("Count : " + total)
      console.log("Total1 : " + total1)
      console.log("Rat : " + rat)
      user.OverAllRating = rat;
      await user.save();
      await Ad.update(
        { "user": user._id },
        { $set: { "userRating": user.OverAllRating } },
        { multi: true });
      await ad.save();

      res.json(ads);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/payment/:id",
  [auth],
  async (req, res) => {



    try {
      const { account, accountid } = req.body;
      const user = await User.findById(req.user.id).select("-password");

      const ad = await Ad.findById(req.params.id);
      ad.ispayment = true;
      ad.payment = ad.issued_price
      ad.account = account;
      ad.accountid = accountid

      await ad.save();
      const ads = await Ad.find({
        $and: [{ issued_to: req.user.id }, { status: true }],
      });
      // const ads = await Ad.find({user:req.user.id.toString(),issued_to:req.user.id,status:true}).sort({data:-1})
      // const ads = await Ad.find().sort({ date: -1 });
      res.json(ads);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  Delete api/ads/comment/:id/:comment_id
// @desc   Delete comment from Ad
// @access Private

// @route  Ad api/ads/bid/:id
// @desc   Bid on a Ad
// @access Private
router.post(
  "/bid/:id",
  [auth, [check("text", "Bid is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      //return res.json(user)

      const ad = await Ad.findById(req.params.id);

      //  const is_same_user =

      if (ad.user.toString() !== req.user.id) {
        const is_update = ad.bids.find(
          ({ user }) => user.toString() === req.user.id
        );
        const n = null;
        if (is_update) {
          ad.bids.filter(
            (bid) =>
              (bid.price =
                bid.user.toString() === req.user.id ? req.body.text : bid.price)
          );

          //  n = ad.bids.filter(bid=>bid.user.toString()===req.user.id)
        } else {
          const newBid = {
            price: req.body.text,
            firstname: user.fname + " " + user.lname,
            userRating: user.OverAllRating,
            user: req.user.id,
          };

          // return res.json(newBid)

          ad.bids.unshift(newBid);
        }

        await ad.save();
        res.json(ad.bids);
      } else {
        res.json({ status: 201 });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  Delete api/ads/bid/:id/:bid_id
// @desc   Delete bid from Ad
// @access Private
router.delete("/bid/:id/:bid_id", auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    // Pull out bid
    const bid = ad.bids.find((bid) => bid.id === req.params.bid_id);

    // Make sure comment exists
    if (!bid) {
      return res.status(404).json({ msg: "Bid does not exists" });
    }

    // Check user
    if (bid.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = ad.bids
      .map((bid) => bid.user.toString())
      .indexOf(req.user.id);

    ad.bids.splice(removeIndex, 1);

    await ad.save();

    res.json(ad.bids);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


/**
 * @route DELETE api/ads/admin/categories/:id
 * @desc Delete a category item
 * @access Private
 */
router.delete('/admin/categories/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Catagory.findByIdAndDelete(id)

    res.json({ success: true })
  } catch (error) {
    res.status(500).send(error.message);
  }
})

/**
 * @route DELETE api/ads/admin/ads/:id
 * @desc Delete a ads item
 * @access Private
 */
router.delete('/admin/ads/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Ad.findByIdAndDelete(id)

    res.json({ success: true })
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/admin/ads/block/:id/:status', auth, async (req, res) => {
  try {
    const { id, status } = req.params
    if (id !== req.user.id) {
      const ad = await Ad.findById(id)
      if (status === "Block") {
        ad.auth_status = "BLOCKED"
      }
      else if (status === "Unblock") {
        ad.auth_status = ""
      }
      await ad.save();
      res.json(id)
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
