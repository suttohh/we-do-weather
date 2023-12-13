import {ForecastDay} from './forecast-day.js';
import {ForecastHour} from './forecast-hour.js';
import {parse} from 'date-fns';

export function Forecast(forecast) {
    this.date = forecast.date;
    this.forecastDay = new ForecastDay(forecast.day);
    this.forecastHour = [];
    for(let i = 0; i < forecast.hour.length; i++) {
        this.forecastHour.push(new ForecastHour(forecast.hour[i]));
    }
}

Forecast.prototype = {
    getDate: function() {
        return parse(this.date, "yyyy-MM-dd", new Date());
    }
}