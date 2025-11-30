const apiKey = "4RXL49B3JKJWUZYUB9M9JS2BF";
let city;

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

    console.log(data);
    let fahrenheitTemp = data.currentConditions.temp;
    let celsius = ((fahrenheitTemp - 32) * 5) / 9;

    console.log(`La temperatura actual es: ${fahrenheitTemp}`);
    console.log(`The temperature in Celsius is ${celsius.toFixed(2)}`);
  } catch (error) {
    console.error("Error", error);
  }
}
getUserInput();
