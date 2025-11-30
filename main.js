const apiKey = "4RXL49B3JKJWUZYUB9M9JS2BF";
const city = "Madrid";
fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    let fahrenheitTemp = data.currentConditions.temp;
    let celsius = ((fahrenheitTemp - 32) * 5) / 9;

    console.log(`La temperatura actual es: ${fahrenheitTemp}`);
    console.log(`The temperature in Celsius is ${celsius.toFixed(2)}`);
  })
  .catch((error) => {
    console.error("Error", error);
  });
