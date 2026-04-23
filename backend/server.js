const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const analyticsRoute = require("./routes/analytics");

app.use("/api/analytics", analyticsRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});