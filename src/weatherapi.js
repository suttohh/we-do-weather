import {Forecast} from './forecast.js';
import {Weather} from './weather.js';

export function WeatherAPI(location, days) {
    this.weatherAPIKey = "ff28227ab63d41c1b9c33307230712";
    this.weatherFutureURI = "http://api.weatherapi.com/v1/future.json?";
    this.weatherForecastURI = "http://api.weatherapi.com/v1/forecast.json?"
    this.location = "Parkes";
    this.days = 7;
    //Get air quality data
    this.aqi = "no";
    //Get weather alert data
    this.alerts = "no";

    //fields to be initialised and later filled by the API return
    this.forecastList = [];
}

WeatherAPI.prototype = {
    callForecast: async function() {
        return fetch(this.weatherForecastURI + "key=" + this.weatherAPIKey + "&q=" + this.location + "&days=" + this.days + "&aqi=no&alerts=no", {
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            const weather = new Weather(response);
            return weather;
        })
        .catch(err => {
            return err;
        });
    }
};