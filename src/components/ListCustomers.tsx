import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListCustomers = ({ triggerClick, setTriggerClick }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const customers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    customers();
  }, [triggerClick]);

  const deleteCustomer = (id) => {
    try {
      axios.delete(`http://localhost:8080/customers/${id}`);
      setTriggerClick(!triggerClick);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      {customers.length !== 0 ? (
        <>
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
                    <button onClick={() => deleteCustomer(customer._id)}>
                      Delete{" "}
                    </button>
                  </div>
                ))
              : ""}
          </ul>
        </>
      ) : (
        <p style={{ textAlign: "center" }}> There is currently no customer</p>
      )}
    </div>
  );
};

export default ListCustomers;
