import {Condition} from './condition.js';
import {parse} from 'date-fns';

export function ForecastHour(forecastHour) {
    this.chanceOfRain = forecastHour.chance_of_rain;
    this.chanceOfSnow = forecastHour.chance_of_snow;
    this.cloud = forecastHour.cloud;
    this.dewpointC = forecastHour.dewpoint_c;
    this.dewpointF = forecastHour.dewpoint_f;
    this.gustKPH = forecastHour.gust_kph;
    this.gustMPH = forecastHour.gust_mph;
    this.heatIndexC = forecastHour.heatindex_c;
    this.heatIndexF = forecastHour.heatindex_f;
    this.humidity = forecastHour.humidity;
    this.isDay = forecastHour.is_day;
    this.precipitationInches = forecastHour.precip_in;
    this.precipitationMillimeters = forecastHour.precip_mm;
    this.pressureInches = forecastHour.pressure_in;
    this.pressureMB = forecastHour.pressure_mb;
    this.temperatureC = forecastHour.temp_c;
    this.temperatureF = forecastHour.temp_f;
    this.time = forecastHour.time;
    this.ultraviolet = forecastHour.uv;
    this.visKM = forecastHour.vis_km;
    this.visM = forecastHour.vis_miles;
    this.willItRain = forecastHour.will_it_rain;
    this.willItSnow = forecastHour.will_it_snow;
    this.windDegree = forecastHour.wind_degree;
    this.windDirection = forecastHour.wind_dir;
    this.windKPH = forecastHour.wind_kph;
    this.windMPH = forecastHour.wind_mph;
    this.windChillC = forecastHour.windchill_c;
    this.windChillF = forecastHour.windchill_f;
    this.condition = new Condition(forecastHour.condition.text);
}

ForecastHour.prototype = {
    getTime: function() {
        return parse(this.time, "yyyy-MM-dd HH:mm", new Date());
    }
}