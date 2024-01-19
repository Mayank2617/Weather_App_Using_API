// Default things
// My Api Key : 38894f30f5075bdecdc6b738b662001f
// url with city name : https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const apiKey = "38894f30f5075bdecdc6b738b662001f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let checker = 0;
let checkerInvalid = 1;
const defaultPlace = "delhi";

let CurrentDate = document.getElementById("Date");
let CurrentTime = document.getElementById("Time");
let City = document.getElementById("Place_Name");
let SearchCity = document.getElementById("Search_Place");
let SearchButton = document.getElementById('SearchButton');
let Temperature = document.getElementById("Temperature");
let weatherIcon = document.getElementById("weatherIcon");
let Humidity = document.getElementById("Humidity");
let WindSpeed = document.getElementById("WindSpeed");
let ErrorMsg = document.getElementById("ErrorMsg");
let conditionText= document.querySelector("#Condition");
if (checker == 0) {
    checkWether(defaultPlace);
}

async function checkWether(city) {
    checker = 1;
    const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);
    if (response.status == 404 ) {
        ErrorMsg.style.visibility = "visible";
    } else {
        ErrorMsg.style.visibility = "hidden";
        let SystemDate = new Date();
        CurrentDate.innerHTML = SystemDate.getDate() + "/" + (SystemDate.getMonth() + 1) + "/" + SystemDate.getFullYear();
        var data = await response.json();
        console.log(data);
        var iconCode = data.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
        console.log(iconUrl);
        City.innerHTML = data.name;
        Temperature.innerHTML = Math.round(data.main.temp);
        Humidity.innerHTML = Math.round(data.main.humidity);
        WindSpeed.innerHTML = Math.round(data.wind.speed);
        weatherIcon.src = iconUrl;
        conditionText.textContent = data.weather[0].main;
    }
}


SearchButton.addEventListener("click", () => {
    checkWether(SearchCity.value);
})