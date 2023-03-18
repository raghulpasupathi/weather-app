import { DateTime, Zone } from "luxon";
const API_KEY_1 = "f45e296882f195aef418ec372e905f58"; 
const BASE_URL= "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY_1});

    return fetch(url)
        .then((res) => (res.json()));

}

const formatCurrentWeather = (data) => {
    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_max, temp_min, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: details, icon } = weather[0];

    return { lon, lat, temp, feels_like, temp_max, temp_min, humidity, name, dt, country, sunrise, sunset, details, icon, speed };
}

const formatForecastWeather = (data) => {
    let { city: {timezone}, list } = data, daily = [];

    for(let i = 3, j = 11; i<=35; i+=8, j+=8)
    {daily.push(list.slice(i,j).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        };
     })[0])
    };

    let hourly = list.slice(0, 3).map((h) => {
        return {
            title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
            temp: h.main.temp,
            icon: h.weather[0].icon
        };   
    })

    return { timezone, daily, hourly}; 
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {return DateTime.fromSeconds(secs).setZone(zone/60).toFormat(format);}

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    const  {lat, lon} = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData('forecast', { lat, lon, cnt: 40,units: searchParams.units }).then(formatForecastWeather);
    
    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };