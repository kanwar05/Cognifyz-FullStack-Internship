const express = require("express");
const {
  getAnalytics,
  getHistory,
  getFeaturedCities,
} = require("../services/weatherService");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    analytics: getAnalytics(),
    history: getHistory(),
    featuredCities: getFeaturedCities(),
  });
});

router.get("/explorer", (req, res) => {
  res.render("explorer", {
    title: "API Explorer",
    featuredCities: getFeaturedCities(),
  });
});

router.get("/history", (req, res) => {
  res.render("history", {
    title: "Search History",
    history: getHistory(),
  });
});

router.get("/analytics", (req, res) => {
  res.render("analytics", {
    title: "API Analytics",
    analytics: getAnalytics(),
  });
});

router.get("/settings", (req, res) => {
  res.render("settings", {
    title: "Settings",
    apiBaseUrl: process.env.WEATHER_API_BASE_URL || "https://api.open-meteo.com/v1",
    cacheTtlMinutes: Number(process.env.CACHE_TTL_MINUTES || 10),
  });
});

module.exports = router;
