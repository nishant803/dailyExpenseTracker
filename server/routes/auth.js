const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  let user = await User.find();
  res.send(user);
  res.send();
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ Emailmessage: "Invalid email" });
    }
    let password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res.status(400).send({ Passwordmessage: "Invalid Password" });
    }
    const token = user.getAuthToken();
    res.cookie("jwtoken", token, {
      httpOnly: true,
    });
    res
      .status(200)
      .send({
        name: user.name,
        email: user.email,
        number: user.number,
        date: user.date, 
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { httpOnly: true });
  res.status(200).send("User Logout");
});
module.exports = router;
