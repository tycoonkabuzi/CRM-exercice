import { useNavigate } from "react-router-dom";

function PaginationComponent({ numberOfPage }) {
  const navigate = useNavigate();
  console.log(numberOfPage);
  const arrayPages = [];
  for (let i = 0; i < numberOfPage; i++) {
    arrayPages.push(i);
  }
  return (
    <div className="main-pagination">
      <ul>
        {arrayPages.length < 0 ? (
          <li>
            <a href="">Previous</a>
          </li>
        ) : (
          ""
        )}
        {arrayPages.map((page) => (
          <li>
            <a onClick={() => navigate(`/customers?page=${page + 1}&limit=10`)}>
              {page + 1}
            </a>
          </li>
        ))}
        {arrayPages.length > 3 ? (
          <li>
            <a href="">Next</a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default PaginationComponent;
