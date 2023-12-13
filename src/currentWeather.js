import {Condition} from './condition.js';

export function CurrentWeather(data) {
    this.temperatureC = data.temp_c;
    this.temperatureF = data.temp_f;
    this.ultraviolet = data.uv;
    this.feelsLikeC = data.feelslike_c;
    this.feelsLikeF = data.feelslike_f;
    this.humidity = data.humidity;
    this.isDay = data.is_day;
    this.updatedDateTime = data.last_updated;
    this.precipitationInches = data.precip_in;
    this.precipitationMillimeters = data.precip_mm;
    this.condition = new Condition(data.condition.text);
    this.windDegree = data.wind_degree;
    this.windDirection = data.wind_dir;
    this.windKPH = data.wind_kph;
    this.windMPH = data.wind_mph;
}