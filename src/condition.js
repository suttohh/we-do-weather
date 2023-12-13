export function Condition(text) {
    this.text = text;
    this.icon = Condition.weatherIconMap.get(text);
}

Condition.weatherIcons = {
    SUNNY: "sunny",
    PARTLY_CLOUDY_DAY: "partly_cloudy_day",
    RAINY: "rainy",
    CLOUD: "cloud",
    FOGGY: "foggy",
    MISTY: "misty",
    SNOWY: "weather_snowy",
    HAIL: "weather_hail",
    THUNDERSTORM: "thunderstorm",
    FREEZING: "ac_unit",
    SEVERE_COLD: "severe_cold",
    RAINY_HEAVY: "rainy_heavy",
    CLEAR: "dark_mode"
}

Condition.weatherIconMap = new Map();
Condition.weatherIconMap.set('Sunny', Condition.weatherIcons.SUNNY);
Condition.weatherIconMap.set('Partly cloudy', Condition.weatherIcons.CLOUD);
Condition.weatherIconMap.set('Cloudy', Condition.weatherIcons.CLOUD);
Condition.weatherIconMap.set('Overcast', Condition.weatherIcons.FOGGY);
Condition.weatherIconMap.set('Mist', Condition.weatherIcons.MISTY);
Condition.weatherIconMap.set('Patchy rain possible', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Patchy snow possible', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Patchy sleet possible', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Patchy freezing drizzle possible', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Thundery outbreaks possible', Condition.weatherIcons.THUNDERSTORM);
Condition.weatherIconMap.set('Blowing snow', Condition.weatherIcons.FREEZING);
Condition.weatherIconMap.set('Blizzard', Condition.weatherIcons.SEVERE_COLD);
Condition.weatherIconMap.set('Fog', Condition.weatherIcons.FOGGY);
Condition.weatherIconMap.set('Freezing fog', Condition.weatherIcons.SEVERE_COLD);
Condition.weatherIconMap.set('Patchy light drizzle', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Light drizzle', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Freezing drizzle', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Heavy freezing drizzle', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Patchy light rain', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Light rain', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Moderate rain at times', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Moderate rain', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Heavy rain at times', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Heavy rain', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Light freezing rain', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Moderate or heavy freezing rain', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Light sleet', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Moderate or heavy sleet', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Patchy light snow', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Light snow', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Patchy moderate snow', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Moderate snow', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Patchy heavy snow', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Heavy snow', Condition.weatherIcons.SNOWY);
Condition.weatherIconMap.set('Ice pellets', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Light rain shower', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Moderate or heavy rain shower', Condition.weatherIcons.RAINY);
Condition.weatherIconMap.set('Torrential rain shower', Condition.weatherIcons.RAINY_HEAVY);
Condition.weatherIconMap.set('Light sleet showers', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Moderate or heavy sleet showers', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Light snow showers', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Moderate or heavy snow showers', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Light showers of ice pellets', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Moderate or heavy showers of ice pellets', Condition.weatherIcons.HAIL);
Condition.weatherIconMap.set('Patchy light rain with thunder', Condition.weatherIcons.THUNDERSTORM);
Condition.weatherIconMap.set('Moderate or heavy rain with thunder', Condition.weatherIcons.THUNDERSTORM);
Condition.weatherIconMap.set('Patchy light snow with thunder', Condition.weatherIcons.THUNDERSTORM);
Condition.weatherIconMap.set('Moderate or heavy snow with thunder', Condition.weatherIcons.THUNDERSTORM);
Condition.weatherIconMap.set('Clear', Condition.weatherIcons.CLEAR);