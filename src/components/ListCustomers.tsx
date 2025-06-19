import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListCustomers = () => {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    const customers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        setCustomers(response.data);
      } catch (error) {}
    };

    customers();
  }, []);
  return (
    <div className="main">
      <h1>List customers</h1>
      <ul>
        {customers
          ? customers.map((customer) => (
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
                <button>Edit </button>
                <button>Delete </button>
              </div>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default ListCustomers;
