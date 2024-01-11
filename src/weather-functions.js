import {WeatherAPI} from './weatherapi.js';
import {format, isToday} from 'date-fns';

export async function loadWeather() {
    const weatherAPI = new WeatherAPI("Parkes", 7);
    const weather = await weatherAPI.callForecast();
    createWeatherElements(weather, weatherAPI);
}

function createWeatherElements(weather, weatherAPI) {
    document.body.appendChild(createPageHeader(weatherAPI));
    document.body.appendChild(createGeneralWeatherSection(weather));

    const pageLayout = document.createElement('div');
    pageLayout.setAttribute('id', 'page-layout');
    document.body.appendChild(pageLayout);
    pageLayout.appendChild(createWeatherForecastDayGrid(weather));
}

function createCurrentWeatherCard(weather) {
    const currentWeatherCard = document.createElement('div');
    currentWeatherCard.setAttribute('id', 'current-weather-card');
    currentWeatherCard.classList.add('weather-card');

    const currentWeatherCardTitle = document.createElement('span');
    currentWeatherCardTitle.classList.add('weather-card-title');
    currentWeatherCardTitle.innerHTML = weather.currentWeather.condition.text;
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
    weatherWindDirection.setAttribute("fill", "white");
    weatherWindDirection.setAttribute("height", "45");
    weatherWindDirection.setAttribute("width", "45");
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
        if(isToday(weather.forecastList[i].getDate())) {
            gridRowDate.innerHTML = "Today " + format(weather.forecastList[i].getDate(), "dd MMMM");
        } else {
            gridRowDate.innerHTML = format(weather.forecastList[i].getDate(), "EEE dd MMMM");
        }
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
        gridRowHourlyBreakdownText.classList.add('hourly-breakdown');
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

function createGeneralWeatherSection(weather) {
    const generalWeatherSection = document.createElement('div');
    generalWeatherSection.setAttribute('id', 'general-weather-section');
    const weatherBackground = document.createElement('div');
    weatherBackground.classList.add('weather-background');
    generalWeatherSection.appendChild(weatherBackground);

    weatherBackground.appendChild(createGeneralInfoDiv(weather));
    weatherBackground.appendChild(createCurrentWeatherCard(weather));
    
    return generalWeatherSection;
}

function createGeneralInfoDiv(weather) {
    const generalInfoDiv = document.createElement('div');
    generalInfoDiv.setAttribute('id', 'general-info-div');

    const locationCard = document.createElement('div');
    locationCard.classList.add('location-card');
    generalInfoDiv.appendChild(locationCard);

    const locationTown = document.createElement('span');
    locationTown.classList.add('location-town');
    locationTown.innerHTML = weather.location.name;
    locationCard.appendChild(locationTown);

    const locationRegion = document.createElement('span');
    locationRegion.classList.add('location-region');
    locationRegion.innerHTML = weather.location.region;
    locationCard.appendChild(locationRegion);

    const locationCountry = document.createElement('span');
    locationCountry.classList.add('location-region');
    locationCountry.innerHTML = weather.location.country;
    locationCard.appendChild(locationCountry);

    const miscInfoCard = document.createElement('div');
    miscInfoCard.classList.add('misc-info-card');
    generalInfoDiv.appendChild(miscInfoCard);

    const feelsLikeDiv = document.createElement('div');
    feelsLikeDiv.classList.add('misc-info-display');
    miscInfoCard.appendChild(feelsLikeDiv);

    const feelsLikeIcon = document.createElement('span');
    feelsLikeIcon.classList.add('material-symbols-outlined', 'misc-info-icon');
    feelsLikeIcon.innerHTML = "thermostat";
    feelsLikeDiv.appendChild(feelsLikeIcon);

    const feelsLikeTitle = document.createElement('span');
    feelsLikeTitle.classList.add('misc-info-title');
    feelsLikeTitle.innerHTML = "Feels like";
    feelsLikeDiv.appendChild(feelsLikeTitle);

    const feelsLikeValue = document.createElement('span');
    feelsLikeValue.classList.add('misc-info-value');
    feelsLikeValue.innerHTML = weather.currentWeather.feelsLikeC + "°C";
    feelsLikeDiv.appendChild(feelsLikeValue);

    const humidityDiv = document.createElement('div');
    humidityDiv.classList.add('misc-info-display');
    miscInfoCard.appendChild(humidityDiv);

    const humidityIcon = document.createElement('span');
    humidityIcon.classList.add('material-symbols-outlined', 'misc-info-icon');
    humidityIcon.innerHTML = "humidity_percentage";
    humidityDiv.appendChild(humidityIcon);

    const humidityTitle = document.createElement('span');
    humidityTitle.classList.add('misc-info-title');
    humidityTitle.innerHTML = "Humidity";
    humidityDiv.appendChild(humidityTitle);

    const humidityValue = document.createElement('span');
    humidityValue.classList.add('misc-info-value');
    humidityValue.innerHTML = weather.currentWeather.humidity + "%";
    humidityDiv.appendChild(humidityValue);

    const chanceOfRainDiv = document.createElement('div');
    chanceOfRainDiv.classList.add('misc-info-display');
    miscInfoCard.appendChild(chanceOfRainDiv);

    const chanceOfRainIcon = document.createElement('span');
    chanceOfRainIcon.classList.add('material-symbols-outlined', 'misc-info-icon');
    chanceOfRainIcon.innerHTML = "rainy";
    chanceOfRainDiv.appendChild(chanceOfRainIcon);

    const chanceOfRainTitle = document.createElement('span');
    chanceOfRainTitle.classList.add('misc-info-title');
    chanceOfRainTitle.innerHTML = "Chance of rain";
    chanceOfRainDiv.appendChild(chanceOfRainTitle);

    const chanceOfRainValue = document.createElement('span');
    chanceOfRainValue.classList.add('misc-info-value');
    //forecastList[0] == Today
    chanceOfRainValue.innerHTML = weather.forecastList[0].forecastDay.dailyChanceOfRain + "%";
    chanceOfRainDiv.appendChild(chanceOfRainValue);

    return generalInfoDiv;
}

function createPageHeader(weatherAPI) {
    const headerDiv = document.createElement('div');
    headerDiv.setAttribute('id', 'page-header-div');

    const pageLogoDiv = document.createElement('div');
    pageLogoDiv.classList.add('page-logo-div');
    headerDiv.appendChild(pageLogoDiv);
    const pageLogo = document.createElement('span');
    pageLogo.classList.add('material-symbols-outlined', 'page-logo');
    pageLogo.innerHTML = "routine";
    pageLogoDiv.appendChild(pageLogo);
    const pageLogoTitle = document.createElement('span');
    pageLogoTitle.classList.add('page-logo-title');
    pageLogoTitle.innerHTML = "We Do Weather";
    pageLogoDiv.appendChild(pageLogoTitle);

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-div');
    headerDiv.appendChild(errorDiv);
    const searchDiv = document.createElement('search-div');
    searchDiv.classList.add('search-div');
    errorDiv.appendChild(searchDiv);
    const error = document.createElement('span');
    error.classList.add('error-span');
    errorDiv.appendChild(error);
    const searchBar = document.createElement('input');
    searchBar.setAttribute('id', 'search-bar');
    searchBar.setAttribute('placeholder', "Enter a location");
    searchDiv.appendChild(searchBar);
    const searchButton = document.createElement('button');
    searchButton.setAttribute('id', 'search-button');
    searchButton.innerHTML = "Search";
    searchDiv.appendChild(searchButton);

    searchButton.onclick = async () => {
        weatherAPI.location = searchBar.value;
        try {
            const weather = await weatherAPI.callForecast();
            document.getElementById('page-header-div').remove();
            document.getElementById('general-weather-section').remove();
            document.getElementById('page-layout').remove();
            createWeatherElements(weather, weatherAPI);
        } catch(err) {
            console.log(err);
            error.innerHTML = err.message;
        }
    }

    return headerDiv;
}