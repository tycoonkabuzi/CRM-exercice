import { Link } from "react-router-dom";

const SearchResults = ({ resultData }) => {
  return (
    <div className="main-results-search">
      {resultData.map((data) => (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`customer/${data._id}`}
        >
          <h1> {data.name}</h1>
          <p>
            {data.address.number}, {data.address.street}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
