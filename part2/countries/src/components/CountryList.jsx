import CountryDetails from "./CountryDetails";

const CountryList = ({
  countries,
  handleShowCountry,
  selectedCountryData,
  weatherData,
}) => {
  return (
    <div>
      {countries.map((country, index) => (
        <div key={index}>
          {country}
          <button onClick={() => handleShowCountry(country)}>show</button>
        </div>
      ))}
      {selectedCountryData && (
        <CountryDetails
          countryData={selectedCountryData}
          weatherData={weatherData}
        />
      )}
    </div>
  );
};

export default CountryList;
