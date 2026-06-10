const express = require("express");
const { apiLimiter } = require("../middleware/rateLimiter");
const {
  searchWeather,
  getAnalytics,
  getHistory,
} = require("../services/weatherService");

const router = express.Router();

router.get("/weather", apiLimiter, async (req, res, next) => {
  try {
    const city = String(req.query.city || "").trim();
    const weather = await searchWeather(city);
    res.json({ success: true, data: weather });
  } catch (error) {
    next(error);
  }
});

router.get("/analytics", (req, res) => {
  res.json({ success: true, data: getAnalytics() });
});

router.get("/history", (req, res) => {
  res.json({ success: true, data: getHistory() });
});

module.exports = router;
