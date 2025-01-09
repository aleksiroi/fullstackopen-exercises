const Search = ({ search, handleFilterChange }) => {
    return (
      <div>
        find countries{' '}
        <input 
          value={search}
          onChange={handleFilterChange}
        />
      </div>
    );
  };
  
  export default Search;
  