const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const analyticsRoute = require("./routes/analytics");

app.use("/api/analytics", analyticsRoute);

app.get("/predict-trend", async (req, res) => {
  try {
    const response = await fetch(process.env.ML_API_URL + "/predict-trend");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("ML API error:", error);
    res.status(500).json({ error: "Failed to fetch prediction" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});