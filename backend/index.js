const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log("CONNECTED TO MONGODB");
  app.listen(8000, () => {
    console.log("Server is running");
  });
});
