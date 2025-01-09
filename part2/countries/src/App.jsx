import { useState, useEffect } from 'react';
import Search from './components/Search';
import Countries from './components/Countries';
import countryService from './services/countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService.getAll()
      .then((response) => setCountries(response))
      .catch(() => console.error('Failed to fetch countries'));
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredCountries(
      countries.filter((country) => country.toLowerCase().includes(value))
    );
  };

  return (
    <div>
      <Search search={search} handleFilterChange={handleFilterChange} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
