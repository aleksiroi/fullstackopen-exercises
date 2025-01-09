import Weather from "./Weather";

const CountryDetails = ({ countryData, weatherData }) => {
  const { name, capital, population, languages, flags } = countryData ?? {};

  return (
    <div>
      <h1>{name.common}</h1>
      <div>Capital: {capital?.[0]}</div>
      <div>Population: {population}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages || {}).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={flags.png}
        alt={`Flag of ${name.common}`}
        style={{ width: "150px" }}
      />
      <Weather weatherData={weatherData} capital={capital?.[0]} />
    </div>
  );
};

export default CountryDetails;
