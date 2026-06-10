const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const sidebarCloseTargets = document.querySelectorAll("[data-sidebar-close]");
const backdrop = document.querySelector(".mobile-backdrop");
const themeToggle = document.querySelector("[data-theme-toggle]");
const toastElement = document.querySelector("#appToast");
const weatherForm = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");
const resultState = document.querySelector("#resultState");

const toast = toastElement ? new bootstrap.Toast(toastElement, { delay: 3200 }) : null;

function showToast(message, tone = "dark") {
  if (!toastElement || !toast) return;
  toastElement.className = `toast align-items-center text-bg-${tone} border-0`;
  toastElement.querySelector(".toast-body").textContent = message;
  toast.show();
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("apiExplorerTheme", theme);
  const icon = themeToggle?.querySelector("i");
  if (icon) {
    icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
  }
}

function openSidebar() {
  sidebar?.classList.add("open");
  backdrop?.classList.add("show");
}

function closeSidebar() {
  sidebar?.classList.remove("open");
  backdrop?.classList.remove("show");
}

function setLoading(isLoading) {
  const button = weatherForm?.querySelector("button[type='submit']");
  const label = button?.querySelector(".button-label");
  const spinner = button?.querySelector(".spinner-border");

  if (!button || !label || !spinner) return;
  button.disabled = isLoading;
  label.textContent = isLoading ? "Fetching" : "Fetch";
  spinner.classList.toggle("d-none", !isLoading);
}

function renderSkeleton() {
  if (!resultState) return;
  resultState.className = "skeleton";
  resultState.innerHTML = `
    <div class="skeleton-block"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
    <div class="skeleton-line"></div>
  `;
}

function renderWeather(data) {
  if (!resultState) return;

  const location = [data.city, data.region, data.country].filter(Boolean).join(", ");
  const cacheText = data.cached ? "Cached response" : "Live response";

  resultState.className = "result-card";
  resultState.innerHTML = `
    <div class="result-main">
      <div>
        <span class="hero-badge"><i class="bi bi-cloud-check"></i> ${cacheText}</span>
        <h3 class="mt-3 mb-1">${location}</h3>
        <p class="mb-0">${data.provider} weather data fetched at ${data.fetchedAt}</p>
      </div>
      <div class="result-temp">${Math.round(data.temperature)}${data.units.temperature}</div>
    </div>
    <div class="result-meta">
      <div>
        <span>Feels Like</span>
        <strong>${data.feelsLike}${data.units.feelsLike}</strong>
      </div>
      <div>
        <span>Humidity</span>
        <strong>${data.humidity}${data.units.humidity}</strong>
      </div>
      <div>
        <span>Wind</span>
        <strong>${data.windSpeed} ${data.units.windSpeed}</strong>
      </div>
      <div>
        <span>Latitude</span>
        <strong>${Number(data.latitude).toFixed(2)}</strong>
      </div>
      <div>
        <span>Longitude</span>
        <strong>${Number(data.longitude).toFixed(2)}</strong>
      </div>
      <div>
        <span>Weather Code</span>
        <strong>${data.weatherCode}</strong>
      </div>
    </div>
  `;
}

function renderError(message, code) {
  if (!resultState) return;

  const title = code === "RATE_LIMITED" ? "Rate limit reached" : "Request failed";
  resultState.className = "api-error-card";
  resultState.innerHTML = `
    <i class="bi bi-exclamation-octagon"></i>
    <h3 class="mt-3">${title}</h3>
    <p>${message}</p>
    <button class="btn btn-outline-primary" type="button" data-retry-search>
      <i class="bi bi-arrow-clockwise"></i> Try Again
    </button>
  `;

  resultState.querySelector("[data-retry-search]")?.addEventListener("click", () => {
    weatherForm?.requestSubmit();
  });
}

async function fetchWeather(city) {
  setLoading(true);
  renderSkeleton();

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const payload = await response.json();

    if (!response.ok) {
      throw Object.assign(new Error(payload.message || "Unable to fetch weather."), {
        code: payload.code,
      });
    }

    renderWeather(payload.data);
    showToast(`${payload.data.city} weather loaded`, "success");
  } catch (error) {
    renderError(error.message || "Network error. Check your connection and try again.", error.code);
    showToast(error.message || "Network error", error.code === "RATE_LIMITED" ? "warning" : "danger");
  } finally {
    setLoading(false);
  }
}

async function refreshStats() {
  try {
    const response = await fetch("/api/analytics");
    const payload = await response.json();
    if (!response.ok || !payload.success) return;

    Object.entries(payload.data).forEach(([key, value]) => {
      document.querySelectorAll(`[data-stat="${key}"]`).forEach((node) => {
        node.textContent = value;
      });
    });
  } catch (error) {
    // Stats refresh is optional UI polish; page content remains usable if it fails.
  }
}

const savedTheme = localStorage.getItem("apiExplorerTheme") || "light";
setTheme(savedTheme);

sidebarToggle?.addEventListener("click", openSidebar);
sidebarCloseTargets.forEach((target) => target.addEventListener("click", closeSidebar));

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  showToast(`${nextTheme === "dark" ? "Dark" : "Light"} mode enabled`);
});

document.querySelectorAll("[data-city]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!cityInput) return;
    cityInput.value = button.dataset.city || "";
    weatherForm?.requestSubmit();
  });
});

weatherForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput?.value.trim();

  if (!city) {
    renderError("Please enter a city name before fetching weather.", "INVALID_CITY");
    showToast("City name is required", "warning");
    return;
  }

  fetchWeather(city).then(refreshStats);
});

const urlCity = new URLSearchParams(window.location.search).get("city");
if (urlCity && cityInput && weatherForm) {
  cityInput.value = urlCity;
  fetchWeather(urlCity).then(refreshStats);
}
