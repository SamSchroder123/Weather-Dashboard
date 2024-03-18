// const dayjs = require("dayjs");

const APIKey = "49195aee9ede3a4e3cd66ca21d9ad2d6";
const lat = "44.34";
const lon = "10.99";
let city = "";

function APICall(URL) {
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}

function formSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-input").value;
  console.log("form submitted with value: " + searchInput);
  city = searchInput;
  const baseURLCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;
  const dataCityArr = APICall(baseURLCity);
  console.log(dataCityArr);
  const [lat, lon] = getCityLatLon(dataCityArr);
  console.log(lat, lon);
  const baseURLLatLon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  const forecastData = APICall(baseURLLatLon);
  console.log(forecastData);
  populate(forecastData);
}

function getCityLatLon(dataArr) {
  const lat = dataArr[0].lat;
  const lon = dataArr[0].lon;
  return [lat, lon];
}

function populate(data) {
  const today = document.getElementById("today");
  const innerText = `${data.city.name} ${dayjs().format("DD/MM/YYYY")}`;
  const heading = document.createElement("h2");
  heading.textContent = innerText;
  today.appendChild(heading);
}

const form = document.getElementById("search-form");
form.addEventListener("submit", formSubmit);
