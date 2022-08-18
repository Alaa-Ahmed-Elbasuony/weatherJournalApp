/* Global Vars */
let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

// Personal API Key for OpenWeatherMap API
let baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
let apiKey = "&appid=8334bf98c09da2f283a23ee99701d29a&units=imperial";

// Event listener to add function to existing HTML DOM element
const presentData = (weatherData) => {
  document.getElementById("date").innerHTML = `Date : ${weatherData.date}`;
  document.getElementById("temp").innerHTML = `Temperarure : ${Math.round(
    (weatherData.temp - 32) * (5 / 9)
  )} °C`;
  document.getElementById(
    "content"
  ).innerHTML = `Your Feelings : ${weatherData.content}`;
};

/* Function to GET Web API Data*/
const fetchingData = async (baseUrl, apiKey, zipCode) => {
  const res = await fetch(baseUrl + zipCode + apiKey);
  try {
    return await res.json();
  } catch (err) {
    console.err(err);
  }
};

/* Function to POST data */
const postData = async (url = "", info = {}) => {
  const fetchindResult = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    return await fetchindResult.json();
  } catch (err) {
    console.err(err);
  }
};

/* Function to GET Project Data */
const updateInterface = async () => {
  const req = await fetch(" http://127.0.0.1:9999/all");
  try {
    const weatherData = await req.json();
    presentData(weatherData);
  } catch (err) {
    console.err(err);
  }
};

/* Function called by event listener */
const excution = (e) => {
  const feeling = document.getElementById("feelings").value;
  const zipCode = document.getElementById("zip").value;
  fetchingData(baseUrl, apiKey, zipCode)
    .then((data) => {
      postData(" http://127.0.0.1:9999/add", {
        date: currentDate,
        temp: data.list[0].main.temp,
        content: feeling,
      });
    })
    .then((res) => {
      updateInterface();
    });
};

document.getElementById("generate").addEventListener("click", excution);
