// const dayjs = require("dayjs");

const APIKey = "49195aee9ede3a4e3cd66ca21d9ad2d6";
const lat = "44.34";
const lon = "10.99";
let city = "";

function APICall(URL) {
  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function formSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-input").value;
  console.log("form submitted with value: " + searchInput);
  city = searchInput;
  const baseURLCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;
  console.log("getting lat and lon for", city);
  const dataCityArr = await APICall(baseURLCity);
  console.log(dataCityArr);
  const [lat, lon] = getCityLatLon(dataCityArr);
  console.log(lat, lon);
  const baseURLLatLon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`;
  const forecastData = await APICall(baseURLLatLon);
  console.log(forecastData);
  populateToday(forecastData);
  populateForecast(forecastData);
}

function getCityLatLon(dataArr) {
  const lat = dataArr[0].lat;
  const lon = dataArr[0].lon;
  return [lat, lon];
}

function populateToday(data) {
  const today = document.getElementById("today");
  today.innerHTML = "";
  today.appendChild(createForecastDiv(data, 0));
  //   const innerText = `${data.city.name} (${dayjs().format("DD/MM/YYYY HH:mm")})`;
  //   const heading = document.createElement("h2");
  //   heading.textContent = innerText;
  //   today.appendChild(heading);
  //   const infoList = document.createElement("li");
  //   const temp = document.createElement("ul");
  //   const wind = document.createElement("ul");
  //   const humidity = document.createElement("ul");
  //   temp.textContent = `Temperature: ${data.list[0].main.temp} /degrees C`;
  //   wind.textContent = `Wind speed: ${data.list[0].wind.speed} /km/h`;
  //   humidity.textContent = `humidity: ${data.list[0].main.humidity} g/kg`;
  //   infoList.appendChild(temp);
  //   infoList.appendChild(wind);
  //   infoList.appendChild(humidity);
  //   today.appendChild(infoList);
}

function populateForecast(data) {
  const forecast = document.getElementById("forecast");
  forecast.innerHTML = "";
  forecast.appendChild(createForecastDiv(data, 8));
  forecast.appendChild(createForecastDiv(data, 16));
  forecast.appendChild(createForecastDiv(data, 24));
  forecast.appendChild(createForecastDiv(data, 32));
  forecast.appendChild(createForecastDiv(data, 40));
}

function createForecastDiv(data, listIndex) {
  const dayDiv = document.createElement("div");
  dayDiv.setAttribute("class", "forecast-div");
  console.log(data.list[listIndex]);
  const headingText = `${data.city.name} (${dayjs(
    data.list[listIndex].dt_txt
  ).format("DD/MM/YYYY HH:mm")})`;
  const heading = document.createElement("h2");
  heading.textContent = headingText;
  dayDiv.appendChild(heading);
  const infoList = document.createElement("li");
  const temp = document.createElement("ul");
  const wind = document.createElement("ul");
  const humidity = document.createElement("ul");
  temp.textContent = `Temperature: ${data.list[listIndex].main.temp} /degrees C`;
  wind.textContent = `Wind speed: ${data.list[listIndex].wind.speed} /km/h`;
  humidity.textContent = `humidity: ${data.list[listIndex].main.humidity} g/kg`;
  infoList.appendChild(temp);
  infoList.appendChild(wind);
  infoList.appendChild(humidity);
  dayDiv.appendChild(infoList);
  return dayDiv;
}

const form = document.getElementById("search-form");
form.addEventListener("submit", formSubmit);
