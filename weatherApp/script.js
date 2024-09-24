async function weather() {
  const btn = document.querySelector("#btn");
  const msg = document.querySelector("#msg");
  const tempElement = document.querySelector("#temp");
  const humidityElement = document.querySelector("#humidity");
  const windspeedElement = document.querySelector("#windspeed");

  const input = document.getElementById("value");
  const value = input.value.trim();

  if (value === "") {
    alert("Input Field is Empty");
    return;
  }

  btn.innerHTML = "Searching...";

  const places = ["Kolkata", "Mumbai", "Delhi", "Pune", "Patna"];

  // Function to fetch weather details for a place
  async function fetchDetails(place) {
    const url = `https://the-weather-api.p.rapidapi.com/api/weather/${place}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "7244bee77fmshbd83d8ebc123f2cp115008jsn5eeeae39236d",
        "x-rapidapi-host": "the-weather-api.p.rapidapi.com",
      },
    };

    //TABLE tag is fetched to print table data's
    const tabledata = document.getElementById("table");

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Unable to fetch weather details");
      }
      const result = await response.json();

      // Add a new row to the table for predefined places
      if (places.includes(place)) {
        tabledata.innerHTML += `
          <tr>
            <td>${place}</td>
            <td>${result.data.current_weather}</td>
            <td>${result.data.temp}</td>
            <td>${result.data.aqi}</td>
            <td>${result.data.visibility}</td>
            <td>${result.data.wind}</td>
            <td>${result.data.humidity}</td>
          </tr>`;
      } else {
        // Display the message and update individual sections for user input location only

        msg.innerHTML = `<p>Weather for <b>${place}</b></p>`;
        tempElement.innerHTML = `<p><b>${result.data.temp}°C</b> <br> TEMPERATURE: ${result.data.temp} <br> EXPECTED TEMPERATURE: ${result.data.expected_temp}</p>`;
        humidityElement.innerHTML = `<p><b>${result.data.humidity}</b> <br> HUMIDITY: ${result.data.humidity} <br> CURRENT WEATHER: ${result.data.current_weather} <br> VISIBILITY: ${result.data.visibility}</p>`;
        windspeedElement.innerHTML = `<p><b>${result.data.wind}</b> <br> WIND SPEED: ${result.data.wind} <br> AQI: ${result.data.aqi} <br> AQI REMARK: ${result.data.aqi_remark}</p>`;
        btn.innerHTML = "Search";
      }
    } catch (error) {
      if (places.includes(place)) {
        tabledata.innerHTML += `
          <tr>
            <td>${place}</td>
            <td><p><b>No Data Found!!!</b></p></td>
            <td><p><b>No Data Found!!!</b></p></td>
            <td><p><b>No Data Found!!!</b></p></td>
            <td><p><b>No Data Found!!!</b></p></td>
            <td><p><b>No Data Found!!!</b></p></td>
            <td><p><b>No Data Found!!!</b></p></td>
          </tr>`;
      } else {
        btn.innerHTML = "Search";
        msg.innerHTML = `<p><b>No Data Found for ${place}!!!</b></p>`;
      }
    }
  }

  // Fetch weather for user-specified location first (without adding to the table)
  await fetchDetails(value);

  // Fetch weather for predefined places (without affecting the message content)
  for (let place of places) {
    await fetchDetails(place);
  }
}