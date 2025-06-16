import { useState } from "react";
import "../style/main.scss";
import axios from "axios";
const AddCustomerForm = () => {
  const [message, setMessage] = useState({
    status: false,
    message: "",
    color: "",
  });
  const [dataToBeAdded, setDataToBeAdded] = useState({
    address: {
      street: "",
      number: "",
      postCode: "",
    },
    name: "",
    taxId: "",
  });

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataToBeAdded((prev) => {
      const key = name.split("."); // we split the name into two elements of an array it will look like eg: ["address","street"]
      if (key.length == 1) {
        // here we create a condition saying, for every name which does not have a dot or for every single name which is single just put the data directly
        return { ...prev, [name]: value };
      }
      const [parent, child] = key; // here we distructure just to wave the first part and the second part of the name.
      return { ...prev, [parent]: { ...prev[parent], [child]: value } }; // here we create a logic, saying that the parent will be created as an object name.
    });
  };
  console.log(dataToBeAdded);
  const AddCustomer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/customers",
        dataToBeAdded
      );
      setMessage((prev) => ({
        ...prev,
        status: true,
        message: " Successfully added",
      }));
    } catch (error) {
      console.log(error);
      setMessage((prev) => ({
        ...prev,
        message: ` Something Went wrong ${error}`,
      }));
    }
  };

  return (
    <div className="main">
      <form className="form-addCustomer">
        {message.status ? (
          <div className="message">
            <h1>Message</h1> <p> {message.message}</p>
          </div>
        ) : (
          ""
        )}
        <h1>Add Customer</h1>
        <label className="label-addCustomer">Name:</label>
        <input type="text" name="name" onChange={handleForm} />
        <label>tax-id:</label>
        <input type="text" name="taxId" onChange={handleForm} />
        <h2>Address</h2>
        <div className="address">
          <label className="label-addCustomer">street:</label>
          <input type="text" name="address.street" onChange={handleForm} />
          <label className="label-addCustomer">number:</label>
          <input type="text" name="address.number" onChange={handleForm} />
          <label className="label-addCustomer">code:</label>
          <input type="text" name="address.postCode" onChange={handleForm} />
        </div>
        <br /> <br />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            AddCustomer();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
