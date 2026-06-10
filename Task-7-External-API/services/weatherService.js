const axios = require("axios");

const forecastClient = axios.create({
  baseURL: process.env.WEATHER_API_BASE_URL || "https://api.open-meteo.com/v1",
  timeout: Number(process.env.API_TIMEOUT_MS || 7000),
});

const geocodeClient = axios.create({
  baseURL:
    process.env.GEOCODING_API_BASE_URL || "https://geocoding-api.open-meteo.com/v1",
  timeout: Number(process.env.API_TIMEOUT_MS || 7000),
});

const cache = new Map();
const history = [];
const analytics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  cachedResponses: 0,
};

const featuredCities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Kolkata",
  "London",
  "New York",
  "Tokyo",
  "Sydney",
];

function createHttpError(statusCode, message, code) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.publicMessage = message;
  error.code = code;
  return error;
}

function normalizeCity(city) {
  return city.replace(/\s+/g, " ").trim();
}

function getCacheKey(city) {
  return normalizeCity(city).toLowerCase();
}

function readCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {
    cache.delete(key);
    return null;
  }

  analytics.cachedResponses += 1;
  return { ...cached.data, cached: true };
}

function writeCache(key, data) {
  const ttl = Number(process.env.CACHE_TTL_MINUTES || 10) * 60 * 1000;
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
}

function addHistory(entry) {
  history.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...entry,
  });

  if (history.length > 10) {
    history.splice(10);
  }
}

async function geocodeCity(city) {
  const response = await geocodeClient.get("/search", {
    params: {
      name: city,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  const location = response.data?.results?.[0];
  if (!location) {
    throw createHttpError(404, "No matching city was found. Try another search.", "CITY_NOT_FOUND");
  }

  return location;
}

async function searchWeather(rawCity) {
  analytics.totalRequests += 1;

  try {
    const city = normalizeCity(rawCity);
    if (!city || city.length < 2) {
      throw createHttpError(400, "Enter a valid city name with at least 2 characters.", "INVALID_CITY");
    }

    const key = getCacheKey(city);
    const cached = readCache(key);
    if (cached) {
      analytics.successfulRequests += 1;
      addHistory({
        city: cached.city,
        country: cached.country,
        temperature: cached.temperature,
        status: "Cached",
        createdAt: new Date().toISOString(),
      });
      return cached;
    }

    const location = await geocodeCity(city);
    const response = await forecastClient.get("/forecast", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
        timezone: "auto",
      },
    });

    const current = response.data?.current;
    const units = response.data?.current_units;
    if (!current || !units) {
      throw createHttpError(502, "Weather provider returned an unexpected response.", "BAD_PROVIDER_RESPONSE");
    }

    const weather = {
      city: location.name,
      country: location.country,
      region: location.admin1 || "",
      latitude: location.latitude,
      longitude: location.longitude,
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      fetchedAt: current.time,
      units: {
        temperature: units.temperature_2m,
        feelsLike: units.apparent_temperature,
        humidity: units.relative_humidity_2m,
        windSpeed: units.wind_speed_10m,
      },
      cached: false,
      provider: "Open-Meteo",
    };

    writeCache(key, weather);
    analytics.successfulRequests += 1;
    addHistory({
      city: weather.city,
      country: weather.country,
      temperature: weather.temperature,
      status: "Live",
      createdAt: new Date().toISOString(),
    });

    return weather;
  } catch (error) {
    analytics.failedRequests += 1;

    if (error.statusCode) {
      throw error;
    }

    if (error.code === "ECONNABORTED") {
      throw createHttpError(504, "The weather API timed out. Please try again.", "API_TIMEOUT");
    }

    throw createHttpError(502, "Unable to reach the weather API right now.", "API_UNAVAILABLE");
  }
}

function getAnalytics() {
  return {
    ...analytics,
    cachedResponses: analytics.cachedResponses,
    cacheSize: cache.size,
    successRate:
      analytics.totalRequests === 0
        ? 0
        : Math.round((analytics.successfulRequests / analytics.totalRequests) * 100),
  };
}

function getHistory() {
  return [...history];
}

function getFeaturedCities() {
  return [...featuredCities];
}

module.exports = {
  searchWeather,
  getAnalytics,
  getHistory,
  getFeaturedCities,
};
