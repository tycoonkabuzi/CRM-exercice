const SearchResults = ({ resultData }) => {
  return (
    <div className="main-results-search">
      {resultData.map((data) => (
        <>
          <h1> {data.name}</h1>
          <p>
            {data.address.number}, {data.address.street}
          </p>
        </>
      ))}
    </div>
  );
};

export default SearchResults;
