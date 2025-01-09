import { useState, useEffect } from "react";
import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";
import countryService from "../services/countries";
import weatherService from "../services/weather";

const Countries = ({ filteredCountries }) => {
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleShowCountry = (countryName) => {
    countryService
      .getOne(countryName)
      .then((response) => {
        setSelectedCountryData(response);
        const capital = response.capital?.[0];
        if (capital) fetchWeather(capital);
      })
      .catch(() => console.error(`Failed to fetch data for ${countryName}`));
  };

  const fetchWeather = (city) => {
    weatherService
      .getWeather(city)
      .then((data) => setWeatherData(data))
      .catch(() => console.error(`Failed to fetch weather for ${city}`));
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0];
      handleShowCountry(countryName);
    } else {
      setSelectedCountryData(null);
      setWeatherData(null);
    }
  }, [filteredCountries]);

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length > 1) {
    return (
      <CountryList
        countries={filteredCountries}
        handleShowCountry={handleShowCountry}
        selectedCountryData={selectedCountryData}
        weatherData={weatherData}
      />
    );
  }

  if (filteredCountries.length === 1 && selectedCountryData) {
    return (
      <CountryDetails
        countryData={selectedCountryData}
        weatherData={weatherData}
      />
    );
  }

  return <div>No matches found</div>;
};

export default Countries;
