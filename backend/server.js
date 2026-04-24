const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Node 18+ has fetch built-in. If not, uncomment:
// const fetch = require("node-fetch");

const app = express();

/* ✅ CORS setup */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://business-analytics-2.onrender.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

/* ✅ MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB error:", err.message);
  });

/* ✅ Routes */
const analyticsRoute = require("./routes/analytics");
app.use("/api/analytics", analyticsRoute);

/* ✅ Predict Trend Route */
app.get("/predict-trend", async (req, res) => {
  try {
    const ML_API_URL = process.env.ML_API_URL;

    if (!ML_API_URL) {
      return res.status(500).json({
        error: "ML_API_URL is not set in environment variables"
      });
    }

    const url = `${ML_API_URL}/predict-trend`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ML API responded with status ${response.status}`);
    }

    const data = await response.json();

    // 🛡️ Validate response format
    if (
      !data ||
      !Array.isArray(data.months) ||
      !Array.isArray(data.predictions)
    ) {
      return res.status(500).json({
        error: "Invalid response from ML API",
        received: data
      });
    }

    res.json(data);

  } catch (error) {
    console.error("Prediction API error:", error.message);

    res.status(500).json({
      error: "Failed to fetch prediction",
      details: error.message
    });
  }
});

/* ✅ Health Check Route (useful for Render) */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ Server Start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});