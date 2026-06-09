const form = document.querySelector("#weatherForm");
const city = document.querySelector("#city");
const weatherCard = document.querySelector("#weatherCard");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  weatherCard.textContent = "Loading weather...";

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city.value)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    weatherCard.innerHTML = `
      <h2>${data.city}</h2>
      <p><strong>Temperature:</strong> ${data.temperature}${data.units.temperature_2m}</p>
      <p><strong>Humidity:</strong> ${data.humidity}${data.units.relative_humidity_2m}</p>
      <p><strong>Wind:</strong> ${data.windSpeed} ${data.units.wind_speed_10m}</p>
      <p><strong>Fetched at:</strong> ${data.fetchedAt}</p>
    `;
  } catch (error) {
    weatherCard.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
