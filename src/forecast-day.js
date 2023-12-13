import {Condition} from './condition.js';

export function ForecastDay(forecastDay) {
    this.averageHumidity = forecastDay.avghumidity;
    this.averageTemperatureC = forecastDay.avgtemp_c;
    this.averageTemperatureF = forecastDay.avgtemp_f;
    this.dailyChanceOfRain = forecastDay.daily_chance_of_rain;
    this.dailyChanceOfSnow = forecastDay.daily_chance_of_snow;
    this.dailyWillItRain = forecastDay.daily_will_it_rain;
    this.dailyWillItSnow = forecastDay.daily_will_it_snow;
    this.maxTemperatureC = forecastDay.maxtemp_c;
    this.maxTemperatureF = forecastDay.maxtemp_f;
    this.minTemperatureC = forecastDay.mintemp_c;
    this.minTemperatureF = forecastDay.mintemp_f;
    this.totalPrecipitationInches = forecastDay.totalprecip_in;
    this.totalPrecipitationMillimeters = forecastDay.totalprecip_mm;
    this.totalSnowCentimeters = forecastDay.totalsnow_cm;
    this.condition = new Condition(forecastDay.condition.text);
    this.maxWindKPH = forecastDay.maxwind_kph;
    this.maxWindMPH = forecastDay.maxwind_mph;
}