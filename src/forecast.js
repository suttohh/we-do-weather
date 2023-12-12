import {ForecastDay} from './forecastDay.js';

export function Forecast(forecast) {
    this.date = forecast.date;
    this.forecastDay = new ForecastDay(forecast.day);
}