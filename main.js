const apiKey = "4RXL49B3JKJWUZYUB9M9JS2BF";
let city;
const weatherIcons = {
  "clear-day": "img/clear-day.png",
  "clear-night": "img/clear-night.png",
  cloudy: "img/cloudy.png",
  fog: "img/fog.png",
  "partly-cloudy-day": "img/partly-cloudy-day.png",
  "partly-cloudy-night": "img/partly-cloudy-night.png",
  rain: "img/rain.png",
  snow: "img/snow.png",
  wind: "img/wind.png",
};

function getUserInput() {
  const form = document.getElementById("cityForm");
  const cityInput = document.getElementById("cityInput");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    city = cityInput.value;
    console.log(`${city}`);
    weatherFetch(city);
  });
}

async function weatherFetch(cityName) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${apiKey}`
    );
    const data = await response.json();

    const dataFiltered = dataConversion(data);
    console.log("Filtrado:", dataFiltered);

    displayWeather(dataFiltered); // ⬅️ AÑADIDO
  } catch (error) {
    console.error("Error", error);
  }
}

function dataConversion(jsonResponse) {
  let currentConditions = jsonResponse.currentConditions.temp;
  let description = jsonResponse.description;
  let latitude = jsonResponse.latitude;
  let longitude = jsonResponse.longitude;
  let alerts = jsonResponse.alerts || "No alerts";
  let timezone = jsonResponse.timezone;
  let icon = jsonResponse.currentConditions.icon;

  return {
    currentConditions,
    description,
    latitude,
    longitude,
    alerts,
    timezone,
    icon,
  };
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function displayWeather(data) {
  document.getElementById("weatherInfo").classList.remove("hidden");

  document.getElementById("cityName").textContent = city;
  document.getElementById("temp").textContent = `${toCelsius(
    data.currentConditions
  ).toFixed(1)} °C`;
  document.getElementById("timezone").textContent = data.timezone;
  document.getElementById("lat").textContent = data.latitude;
  document.getElementById("lon").textContent = data.longitude;

  document.getElementById("alerts").textContent =
    data.alerts.length > 0 ? data.alerts[0].event : "Ninguna alerta";

  const iconPath = weatherIcons[data.icon] || "img/clear-day.png";
  document.getElementById("weatherIcon").src = iconPath;
}

getUserInput();
