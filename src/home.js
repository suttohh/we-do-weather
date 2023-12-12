import {WeatherAPI} from './weatherapi.js';

function returnData(data) {
    return data;
}
export async function home() {
    const weatherForecast = new WeatherAPI("Parkes", 7);
    const weather = await weatherForecast.callForecast();
    const h1 = document.createElement('h1');
    console.log(weather);
    h1.innerHTML = weather.location.name;
    document.body.appendChild(h1);
}