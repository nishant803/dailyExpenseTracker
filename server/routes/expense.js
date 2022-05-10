const express = require("express");
const authentication = require("../middlewares/authentication");
const auth = require("../middlewares/auth");
const { User } = require("../models/user");
const router = express.Router();
router.get("/", auth, async (req, res) => {
  const userContact = await User.findOne({ _id: req.user._id });
  res.send(userContact.messages);
});

//Today expense

router.get("/today", auth, async (req, res) => {
  let todayDate = new Date().toISOString().slice(0, 10);
  const userContact = await User.find({ _id: req.user._id });
  const userExpenses = userContact[0].messages;
  const updatedArray = userExpenses.filter((items) => items.date === todayDate);
  res.send(updatedArray);
});

//Yesterday Expense

router.get("/yesterday", auth, async (req, res) => {
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .slice(0, 10);
  const userContact = await User.find({ _id: req.user._id });
  const userExpenses = userContact[0].messages;
  const updatedArray = userExpenses.filter((items) => items.date === yesterday);
  res.send(updatedArray);
});

//Last Week Expense

router.get("/week", auth, async (req, res) => {
  const todayDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  console.log(oneWeekAgo.toISOString());
  const userContact = await User.find({ _id: req.user._id})
  const filteredExpenses = userContact[0].messages.filter((elem) => new Date(elem.date) >= oneWeekAgo && new Date(elem.date) <= todayDate)
  res.send(filteredExpenses);
});

//Last Month Expense

router.get("/month", auth, async (req, res) => {
  let todayDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  const userContact = await User.find({ _id: req.user._id });
  const filteredExpenses = userContact[0].messages.filter((elem) => new Date(elem.date) >= oneMonthAgo && new Date(elem.date) <= todayDate)
  res.send(filteredExpenses);
});
//year

router.get("/year", auth, async (req, res) => {
  let todayDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 356);
  const userContact = await User.find({ _id: req.user._id });
  const filteredExpenses = userContact[0].messages.filter((elem) => new Date(elem.date) >= oneMonthAgo && new Date(elem.date) <= todayDate)
  res.send(filteredExpenses);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleteExpense = await User.updateOne(
      { _id: req.user._id },
      { $pull: { messages: { _id: req.params.id } } }
    );
    res.send(deleteExpense);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", auth, async (req, res) => {
  const { type, price, description, date } = req.body;
  if (!type || !price || !description || !date) {
    return res.json({ error: "enter details" });
  }
  const userContact = await User.findOne({ _id: req.user._id });
  if (userContact) {
    const userMessage = await userContact.addMessage(
      type,
      price,
      description,
      date
    );
    await userContact.save();
    res.status(200).json({ message: "Added Successfull" });
  }
});

// router.delete("/:id", [auth, admin], async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndRemove(req.params.id);
//     res.send(movie);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
