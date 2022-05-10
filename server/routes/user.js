const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../middlewares/auth");
router.get("/", async (req, res) => {
  let user = await User.find();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      number: req.body.number,
    });

    await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.put("/",auth,async(req,res)=>{
  try{
    const _id = await req.user._id;
  const updateUser = await User.findByIdAndUpdate(_id,req.body, {new: true});
  console.log(updateUser);
  res.send(updateUser);
  }catch (err){
    console.log(err);
  }
})
module.exports = router;
