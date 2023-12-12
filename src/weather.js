import {Forecast} from './forecast.js';
import {Location} from './location.js';
import {CurrentWeather} from './currentWeather';

export function Weather(weatherData) {
    this.location = new Location(weatherData.location);
    this.currentWeather = new CurrentWeather(weatherData.current);
    this.forecastList = this.setForecastList(weatherData.forecast);
}

Weather.prototype = {
    setForecastList: function(forecast) {
        const forecastList = [];
        for(let i = 0; i < forecast.forecastday.length; i++) {
            forecastList.push(new Forecast(forecast.forecastday[i]));
        }
        return forecastList;
    }
}