import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState('');

  const pressureConst = 0.75006;
  
  const key = '15e0c047d40f93321a4f653136650794';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&lang=uk&appid=${key}`;

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&lang=uk&appid=${key}`;
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);

  const searchWeather = () => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }

  return (
    <div className='app'>
      <div className='inp-field'>
        <input type='text'
        value={town}
        onChange={(event) => setTown(event.target.value)}
        placeholder='Enter location'/>
        <button onClick={searchWeather}>Check weather</button>
      </div>

      <div className='container'>
        <div className="header">
          <div className="city">
            <p>{data.name}, {data.sys ? <span>{data.sys.country}</span> : null}</p>
          </div>
        </div>

        <div className="temp">
          {data.main ? (
            <h1>{data.main.temp.toFixed()} °C</h1>
          ) : null}
        </div>

        <div className="desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null }
        </div>
      </div>
      {data.name !== undefined && (
        <div className="footer">
          <div className="feels">
            {data.main ? (
              <p className="bold">
                {data.main.feels_like.toFixed()} °C
              </p>
            ) : null}
            <p>Feels like</p>      
          </div>

          <div className="humidity">
            {data.main ? (
              <p className="bold">
                {data.main.humidity} %
              </p>
            ) : null}
            <p>Humidity</p>      
          </div>

          <div className="wind">
            {data.wind ? (
              <p className="bold">
                {data.wind.speed} M/S
              </p>
            ) : null}
            <p>Wind speed</p>
          </div>

          <div className="pressure">
            {data.main ? (
              <p className="bold">
                {(data.main.pressure * pressureConst).toFixed()} mmHg
              </p>
            ) : null}
            <p>Pressure</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;