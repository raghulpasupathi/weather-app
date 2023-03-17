import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/WeatherService';

function App() {

  const [query, setQuery] = useState({q: 'sydney'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async() => {
      await getFormattedWeatherData({...query, units: units})
      .then((data) => {
        console.log(data);
        setWeather(data);
      });
    }
    fetchWeather();
  },[query, units])

  const formatBackground = () => {
    if(!weather) return  "from-cyan-700 to-blue-700";

    const threshold = units === "metric" ? 25 : 77;
    if(weather.temp <= threshold) return  "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  }
  return <div className="App">
      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <TopButtons setQuery= {setQuery}/>
        <Inputs setQuery= {setQuery} units={units} setUnits={setUnits}/>

        {weather && 
        <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>

        <Forecast title="hourly forecast" items={weather.hourly}/>
        <Forecast title="daily forecast" items={weather.daily}/>
        </div>
        }
      </div>
    </div>
}

export default App;
