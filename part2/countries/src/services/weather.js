import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
  return axios.get(url).then((response) => {
    const { main, weather, wind } = response.data;
    return {
      temperature: main.temp,
      icon: weather[0].icon,
      description: weather[0].description,
      windSpeed: wind.speed,
    };
  });
};

export default { getWeather };
