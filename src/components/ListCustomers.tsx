import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PaginationComponent from "./PaginationComponent";

const ListCustomers = ({ triggerClick }) => {
  const [customersData, setCustomersData] = useState([]);
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const customers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers?page=${pageNumber}&limit=10`
        );
        console.log(response.data);
        setCustomersData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    customers();
  }, [triggerClick, pageNumber]);

  useEffect(() => {
    const pageFromURL = Number(searchParams.get("page")) || 1;
    setPageNumber(pageFromURL);
  }, [searchParams]);
  return (
    <div className="main">
      {customersData.length !== 0 ? (
        <>
          <h1>List customers</h1>

          <ul>
            {customersData.data?.map((customer) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <li style={{ width: "55%" }}>
                  <Link to={`customer/${customer._id}`} key={customer._id}>
                    {customer.name}
                  </Link>
                </li>
                <button onClick={() => navigate(`edit/${customer._id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    navigate(`/delete/${customer._id}`);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <p style={{ textAlign: "center" }}> There is currently no customer</p>
      )}
      <PaginationComponent numberOfPage={customersData.pages} />
    </div>
  );
};

export default ListCustomers;
