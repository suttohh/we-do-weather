import {WeatherAPI} from './weatherapi.js';
import {format, isToday} from 'date-fns';

export async function loadWeather() {
    const weatherForecast = new WeatherAPI("Parkes", 7);
    const weather = await weatherForecast.callForecast();
    createWeatherElements(weather);
}

function createWeatherElements(weather) {
    const pageLayout = document.createElement('div');
    pageLayout.classList.add('page-layout');
    document.body.appendChild(pageLayout);
    pageLayout.appendChild(createCurrentWeatherCard(weather));
    pageLayout.appendChild(createWeatherForecastDayGrid(weather));
}

function createCurrentWeatherCard(weather) {
    const currentWeatherCard = document.createElement('div');
    currentWeatherCard.setAttribute('id', 'current-weather-card');
    currentWeatherCard.classList.add('weather-card');

    const currentWeatherCardTitle = document.createElement('span');
    currentWeatherCardTitle.classList.add('weather-card-title');
    currentWeatherCardTitle.innerHTML = "Current conditions";
    currentWeatherCard.appendChild(currentWeatherCardTitle);
    
    const weatherInfoDiv = document.createElement('div');
    weatherInfoDiv.classList.add('current-weather-info');
    currentWeatherCard.appendChild(weatherInfoDiv);

    const weatherTemperatureDiv = document.createElement('div');
    weatherTemperatureDiv.classList.add('current-temperature-div');
    weatherInfoDiv.appendChild(weatherTemperatureDiv);
    const weatherIcon = document.createElement('span');
    weatherIcon.classList.add('material-symbols-outlined', weather.currentWeather.condition.icon.replaceAll("_", "-"), 'current-weather-icon');
    weatherIcon.innerHTML = weather.currentWeather.condition.icon;
    weatherTemperatureDiv.appendChild(weatherIcon);
    const weatherTemperature = document.createElement('span');
    weatherTemperature.setAttribute('id', 'current-weather-temperature-text');
    weatherTemperature.innerHTML = weather.currentWeather.temperatureC + '°';
    weatherTemperatureDiv.appendChild(weatherTemperature);

    const weatherPrecipitationDiv = document.createElement('div');
    weatherPrecipitationDiv.classList.add('current-precipitation-div');
    weatherInfoDiv.appendChild(weatherPrecipitationDiv);
    const rainIcon = document.createElement('span');
    rainIcon.classList.add('material-symbols-outlined', 'current-rain-icon');
    rainIcon.innerHTML = "water_drop";
    weatherPrecipitationDiv.appendChild(rainIcon);
    const precipitationText = document.createElement('span');
    precipitationText.setAttribute('id', 'current-weather-precipitation-text');
    precipitationText.innerHTML = weather.currentWeather.precipitationMillimeters + 'mm';
    weatherPrecipitationDiv.appendChild(precipitationText);

    const weatherWindDiv = document.createElement('div');
    weatherWindDiv.classList.add('current-wind-div');
    weatherInfoDiv.appendChild(weatherWindDiv);
    const windIcon = document.createElement('span');
    windIcon.classList.add('material-symbols-outlined', 'current-wind-icon');
    windIcon.innerHTML = "air";
    weatherWindDiv.appendChild(windIcon);
    const windText = document.createElement('span');
    windText.setAttribute('id', 'current-weather-wind-text');
    windText.innerHTML = weather.currentWeather.windKPH + 'k/h';
    weatherWindDiv.appendChild(windText);
    const weatherWindDirection = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    weatherWindDirection.setAttribute("height", "24");
    weatherWindDirection.setAttribute("width", "24");
    weatherWindDirection.setAttribute("viewBox", "0 -960 960 960");
    weatherWindDirection.setAttribute("transform", "rotate(" + weather.currentWeather.windDegree + ")");
    weatherWindDirection.innerHTML = '<path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z"/>';
    weatherWindDiv.appendChild(weatherWindDirection);
    
    return currentWeatherCard;
}

function createWeatherForecastDayGrid(weather) {
    // CONTAINER
    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('id', 'forecast-weather-grid-container');
    // HEADERS
    const weatherGridHeaderDiv = document.createElement('div');
    weatherGridHeaderDiv.classList.add('forecast-weather-grid-header-div');
    gridContainer.appendChild(weatherGridHeaderDiv);
    const weatherGridHeaderDate = document.createElement('span');
    weatherGridHeaderDate.innerHTML = "Date";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderDate);
    const weatherGridHeaderCondition = document.createElement('span');
    weatherGridHeaderCondition.innerHTML = "";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderCondition);
    const weatherGridHeaderTemperature = document.createElement('span');
    weatherGridHeaderTemperature.innerHTML = "Max/Min Temp";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderTemperature);
    const weatherGridHeaderPrecipitation = document.createElement('span');
    weatherGridHeaderPrecipitation.innerHTML = "Precipitation";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderPrecipitation);
    const weatherGridHeaderWind = document.createElement('span');
    weatherGridHeaderWind.innerHTML = "Wind";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderWind);
    // GRID
    const weatherGrid = document.createElement('div');
    weatherGrid.setAttribute('id', 'forecast-weather-grid');
    gridContainer.appendChild(weatherGrid);
    for(let i = 0; i < weather.forecastList.length; i++) {
        const weatherGridRow = document.createElement('div');
        weatherGridRow.classList.add('forecast-weather-grid-row');
        weatherGrid.appendChild(weatherGridRow);
        const gridRowDate = document.createElement('span');
        gridRowDate.innerHTML = weather.forecastList[i].date;
        weatherGridRow.appendChild(gridRowDate);
        const gridRowIcon = document.createElement('span');
        gridRowIcon.classList.add('material-symbols-outlined', weather.forecastList[i].forecastDay.condition.icon.replaceAll("_", "-"), 'grid-row-icon');
        gridRowIcon.innerHTML = weather.forecastList[i].forecastDay.condition.icon;
        weatherGridRow.appendChild(gridRowIcon);
        const gridRowTempDiv = document.createElement('div');
        gridRowTempDiv.classList.add('grid-row-temp-div');
        weatherGridRow.appendChild(gridRowTempDiv);
        const gridRowTempMax = document.createElement('span');
        gridRowTempMax.classList.add('grid-row-temp');
        gridRowTempMax.innerHTML = weather.forecastList[i].forecastDay.maxTemperatureC;
        gridRowTempDiv.appendChild(gridRowTempMax);
        const gridRowTempDivider = document.createElement('span');
        gridRowTempDivider.innerHTML = "/";
        gridRowTempDiv.appendChild(gridRowTempDivider);
        const gridRowTempMin = document.createElement('span');
        gridRowTempMin.classList.add('grid-row-temp');
        gridRowTempMin.innerHTML = weather.forecastList[i].forecastDay.minTemperatureC;
        gridRowTempDiv.appendChild(gridRowTempMin);
        const gridRowPrecipitation = document.createElement('span');
        gridRowPrecipitation.classList.add('grid-row-precipitation');
        gridRowPrecipitation.innerHTML = weather.forecastList[i].forecastDay.totalPrecipitationMillimeters + "mm";
        weatherGridRow.appendChild(gridRowPrecipitation);
        const gridRowWind = document.createElement('span');
        gridRowWind.classList.add('grid-row-wind');
        gridRowWind.innerHTML = Number.parseFloat(weather.forecastList[i].forecastDay.maxWindKPH).toFixed(1) + "k/h";
        weatherGridRow.appendChild(gridRowWind);
        const gridRowHourlyBreakdownDiv = document.createElement('div');
        gridRowHourlyBreakdownDiv.classList.add('grid-row-hourly-breakdown-div');
        weatherGridRow.appendChild(gridRowHourlyBreakdownDiv);
        const gridRowHourlyBreakdownText = document.createElement('span');
        gridRowHourlyBreakdownText.innerHTML = "Hourly breakdown";
        gridRowHourlyBreakdownDiv.appendChild(gridRowHourlyBreakdownText);
        const gridRowHourlyBreakdownIcon = document.createElement('span');
        gridRowHourlyBreakdownIcon.classList.add('material-symbols-outlined', 'grid-row-hourly-breakdown-icon');
        gridRowHourlyBreakdownIcon.innerHTML = "chevron_right";
        gridRowHourlyBreakdownDiv.appendChild(gridRowHourlyBreakdownIcon);
        weatherGridRow.onclick = () => {
            createHourlyBreakdownPopup(weather.forecastList[i]);
        }
    }
    return gridContainer;
}

function createHourlyBreakdownPopup(forecast) {
    const backgroundDiv = document.createElement('div');
    backgroundDiv.classList.add('popup-background-div');
    document.body.appendChild(backgroundDiv);

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.setAttribute('id', 'hourly-breakdown-popup');
    backgroundDiv.appendChild(popup);

    const popupInnerDiv = document.createElement('div');
    popupInnerDiv.classList.add('popup-inner-div');
    popup.appendChild(popupInnerDiv);
    const itemDate = document.createElement('h1');
    itemDate.classList.add('h1-hour-date');
    if(isToday(forecast.getDate())) {
        itemDate.innerHTML = "Today " + format(forecast.getDate(), "dd MMMM");
    } else {
        itemDate.innerHTML = format(forecast.getDate(), "EEEE dd MMMM");
    }
    popupInnerDiv.appendChild(itemDate);
    popupInnerDiv.appendChild(createHourlyBreakdownGrid(forecast));

    backgroundDiv.addEventListener("click", (event) => {
        console.log(event.target.closest(".popup"));
        if (!event.target.closest(".popup")) {
            backgroundDiv.remove();
        }
    });

    popup.onclick = () => {

    }
}

function createHourlyBreakdownGrid(forecast) {
    // CONTAINER
    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('id', 'hourly-forecast-grid-container');
    // HEADERS
    const weatherGridHeaderDiv = document.createElement('div');
    weatherGridHeaderDiv.classList.add('hourly-forecast-grid-header-div');
    gridContainer.appendChild(weatherGridHeaderDiv);
    const weatherGridHeaderDate = document.createElement('span');
    weatherGridHeaderDate.innerHTML = "Time";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderDate);
    const weatherGridHeaderCondition = document.createElement('span');
    weatherGridHeaderCondition.innerHTML = "";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderCondition);
    const weatherGridHeaderTemperature = document.createElement('span');
    weatherGridHeaderTemperature.innerHTML = "Temp";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderTemperature);
    const weatherGridHeaderPrecipitation = document.createElement('span');
    weatherGridHeaderPrecipitation.innerHTML = "Precip.";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderPrecipitation);
    const weatherGridHeaderWind = document.createElement('span');
    weatherGridHeaderWind.innerHTML = "Wind";
    weatherGridHeaderDiv.appendChild(weatherGridHeaderWind);
    // GRID
    const weatherGrid = document.createElement('div');
    weatherGrid.setAttribute('id', 'hourly-forecast-grid');
    gridContainer.appendChild(weatherGrid);
    for(let i = 0; i < forecast.forecastHour.length; i++) {
        const weatherGridRow = document.createElement('div');
        weatherGridRow.classList.add('hourly-forecast-grid-row');
        weatherGrid.appendChild(weatherGridRow);
        const gridRowTime = document.createElement('span');
        gridRowTime.innerHTML = format(forecast.forecastHour[i].getTime(), "H");
        weatherGridRow.appendChild(gridRowTime);
        const gridRowIcon = document.createElement('span');
        gridRowIcon.classList.add('material-symbols-outlined', forecast.forecastHour[i].condition.icon.replaceAll("_", "-"), 'grid-row-icon');
        gridRowIcon.innerHTML = forecast.forecastHour[i].condition.icon;
        weatherGridRow.appendChild(gridRowIcon);
        const gridRowTempDiv = document.createElement('div');
        gridRowTempDiv.classList.add('grid-row-temp-div');
        weatherGridRow.appendChild(gridRowTempDiv);
        const gridRowTemp = document.createElement('span');
        gridRowTemp.classList.add('grid-row-temp');
        gridRowTemp.innerHTML = forecast.forecastHour[i].temperatureC;
        gridRowTempDiv.appendChild(gridRowTemp);
        const gridRowPrecipitation = document.createElement('span');
        gridRowPrecipitation.classList.add('grid-row-precipitation');
        gridRowPrecipitation.innerHTML = forecast.forecastHour[i].precipitationMillimeters + "mm";
        weatherGridRow.appendChild(gridRowPrecipitation);
        const gridRowWindDiv = document.createElement('div');
        gridRowWindDiv.classList.add('grid-row-wind-div');
        weatherGridRow.appendChild(gridRowWindDiv);
        const gridRowWind = document.createElement('span');
        gridRowWind.classList.add('grid-row-wind');
        gridRowWind.innerHTML = Number.parseFloat(forecast.forecastHour[i].windKPH).toFixed(1) + "k/h";
        gridRowWindDiv.appendChild(gridRowWind);
        const gridRowWindDirectionIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        gridRowWindDirectionIcon.classList.add('grid-row-wind-direction-icon');
        gridRowWindDirectionIcon.setAttribute("height", "17");
        gridRowWindDirectionIcon.setAttribute("width", "17");
        gridRowWindDirectionIcon.setAttribute("viewBox", "0 -960 960 960");
        gridRowWindDirectionIcon.setAttribute("transform", "rotate(" + forecast.forecastHour[i].windDegree + ")");
        gridRowWindDirectionIcon.innerHTML = '<path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z"/>';
        gridRowWindDiv.appendChild(gridRowWindDirectionIcon);
    }
    return gridContainer;
}