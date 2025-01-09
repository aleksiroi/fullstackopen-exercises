const Weather = ({ weatherData, capital }) => {
    if (!weatherData) return null;
  
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>Temperature: {weatherData.temperature} °C</div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt={weatherData.description}
        />
        <div>Wind: {weatherData.windSpeed} m/s</div>
      </div>
    );
  };
  
  export default Weather;
  