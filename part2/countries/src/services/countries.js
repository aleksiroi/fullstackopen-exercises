import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  return request.then(response => 
    response.data.map(country => country.name.common)
  );
};

const getOne = (name) => {
    const request = axios.get(`${baseUrl}/api/name/${name}`);
    return request.then((response) => {
      const country = response.data;
      return {
        name: country.name,
        capital: country.capital,
        population: country.population,
        languages: country.languages,
        flags: country.flags,
      };
    });
  };

export default { getAll, getOne };
