const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Routes
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const products = require("./routes/products");
// const testRouter = require("./routes/test");

// Run Express
const app = express();
dotenv.config({ path: "BackEnd/.env" });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// parses req.body to JSON

// Connect To DB By Mongoose        (DB => cloud.mongodb.atlas)
mongoose.connect(
  "mongodb+srv://Amin:test@cluster0.te5sk.mongodb.net/auth?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("Connect To DB!");
  }
);

// Route Middlewares
app.use("/api/users", signupRouter);
app.use("/api/users", loginRouter);
app.use("/api", products);
// app.use("/api/users", testRouter);

// use port 5000 for backend
app.listen(5000, () => console.log("Server Up and Running!"));
