const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/user");
const auth = require("./routes/auth");
const expense = require("./routes/expense");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

mongoose
  .connect("mongodb://localhost/expense-collection")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const corsOption = {
  origin: "http://localhost:3000",
};
app.use("/api/user", cors(corsOption), users);
app.use("/api/auth", cors(corsOption), auth);
app.use("/api/expense", cors(corsOption), expense);

app.listen("3001", () => {
  console.log("Server running...");
});

