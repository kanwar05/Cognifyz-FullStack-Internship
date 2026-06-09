const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3007;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many weather requests. Please wait one minute." },
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Task 7 - External API" });
});

app.get("/api/weather", apiLimiter, async (req, res) => {
  try {
    const city = req.query.city || "Delhi";
    const locations = {
      Delhi: { latitude: 28.61, longitude: 77.23 },
      Mumbai: { latitude: 19.07, longitude: 72.88 },
      Bengaluru: { latitude: 12.97, longitude: 77.59 },
      Kolkata: { latitude: 22.57, longitude: 88.36 },
    };
    const selected = locations[city];
    if (!selected) return res.status(400).json({ message: "Unsupported city selected." });

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selected.latitude}&longitude=${selected.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("External weather service failed.");

    const data = await response.json();
    res.json({
      city,
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      units: data.current_units,
      fetchedAt: data.current.time,
    });
  } catch (error) {
    res.status(502).json({ message: error.message || "Unable to fetch weather data." });
  }
});

app.listen(PORT, () => {
  console.log(`Task 7 server running at http://localhost:${PORT}`);
});
