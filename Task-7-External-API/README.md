# API Explorer Dashboard

Cognifyz Full Stack Internship Task 7: Advanced API Usage and External API Integration.

## Objective

API Explorer Dashboard is a modern Express and EJS dashboard that demonstrates secure external API integration, rate limiting, error handling, caching, request analytics, and responsive UI design.

## Tech Stack

- Node.js
- Express.js
- EJS
- Bootstrap 5
- Vanilla JavaScript
- CSS3
- Axios
- Express Rate Limit
- Dotenv

## Features

- Responsive dashboard layout with sidebar navigation and top profile bar
- Glassmorphism panels, gradient hero section, animated statistic cards, and smooth transitions
- Dark and light mode toggle with local storage persistence
- Weather API explorer powered by Open-Meteo through a secure server-side Express route
- Loading skeletons, spinner states, empty states, API error cards, and toast notifications
- Express Rate Limit protection for `/api/weather`
- In-memory cache for repeated city searches
- In-memory search history showing the last 10 searches
- Analytics cards for total requests, successful requests, failed requests, cached responses, cache size, and success rate
- Central 404 and application error pages

## Folder Structure

```text
Task-7-External-API/
  app.js
  package.json
  routes/
    apiRoutes.js
    dashboardRoutes.js
  services/
    weatherService.js
  middleware/
    errorHandler.js
    rateLimiter.js
  views/
    partials/
      head.ejs
      scripts.ejs
      sidebar.ejs
      topbar.ejs
    dashboard.ejs
    explorer.ejs
    history.ejs
    analytics.ejs
    settings.ejs
    error.ejs
  public/
    css/
      style.css
    js/
      app.js
    images/
  README.md
```

## Setup

```bash
npm install
npm start
```

Open:

```text
http://localhost:3007
```

## Optional Environment Variables

Create a `.env` file inside `Task-7-External-API/` if you want to override defaults.

```env
PORT=3007
WEATHER_API_BASE_URL=https://api.open-meteo.com/v1
GEOCODING_API_BASE_URL=https://geocoding-api.open-meteo.com/v1
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=12
CACHE_TTL_MINUTES=10
API_TIMEOUT_MS=7000
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/weather?city=Delhi` | Fetches live or cached weather data |
| GET | `/api/analytics` | Returns request analytics |
| GET | `/api/history` | Returns the last 10 searches |

## Pages

| Page | Route |
| --- | --- |
| Home Dashboard | `/` |
| API Explorer | `/explorer` |
| Search History | `/history` |
| API Analytics | `/analytics` |
| Settings | `/settings` |
| 404 Error | Any unknown route |

## Security and Advanced API Notes

- Browser requests call the Express backend, not the external provider directly.
- External API configuration is kept server-side and can be controlled with `.env`.
- `express-rate-limit` protects the API route from excessive requests.
- Axios timeouts prevent hanging provider calls.
- Central middleware returns JSON for API errors and polished EJS error pages for browser navigation.
- Repeated city searches can be served from memory cache to reduce external API traffic.

## Screenshot 
<video src="./screenshots/External-api.mp4" width="400" height="500" controls></video>

