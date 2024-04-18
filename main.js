const searchButton = document.querySelector('.searchButton');
const inputValue = document.querySelector('.inputValue');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const displayWeather = document.querySelector('.displayWeather');

let currentTime = new Date().getHours();

if (document.body) {
    if (7 <= currentTime && currentTime < 20) {
        document.body.style.background = 'linear-gradient(to bottom, rgb(100, 178, 249) 11.2%, rgba(114, 231, 159, 0.8) 91.1%)';
        document.getElementById('sun').style.visibility = 'visible';
    } else {
        document.body.style.background = 'linear-gradient(to top, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)';
        document.getElementById('night').style.visibility = 'visible';
    }
}

searchButton.addEventListener('click', async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=31c0f141e560416d1a00fe6534c6f6ad`);
    const d = await res.json();

    if (res.status === 404) {
        alert('City does not exist. Please try another.');
        return; 
    } else if (inputValue.value === '') {
        alert('Enter the name of the city.');
        return; 
    }

    useWeatherData(d);
    addImage(d);
    fadeOutIn(displayWeather);
});

function useWeatherData(weather) {
    temp.innerText = `${Math.round(weather.main.temp)}°C`;
    desc.innerText = `${weather.weather[0].description}`;
}

function addImage(weather) {
    const weatherDescription = weather.weather[0].description;

    const array = ['cloud', 'sun', 'clear', 'snow', 'rain', 'fog', 'wind', 'drizzle', 'thunder'];
    const wstatus = array.find(item => weatherDescription.includes(item));

    displayWeather.style.backgroundImage = `url(${wstatus}.png)`;
    displayWeather.style.backgroundRepeat = 'no-repeat';
    displayWeather.style.backgroundPosition = 'right';
}

function fadeOutIn(element) {
    element.style.transition = '';
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.transition = 'opacity 1.2s ease-in-out';
        element.style.opacity = 1;
    }, 100);
}