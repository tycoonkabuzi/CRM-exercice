import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListCustomers = () => {
  const navigate = useNavigate();
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
              <li>
                <Link to={`customer/${customer._id}`} key={customer._id}>
                  {customer.name}
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default ListCustomers;
