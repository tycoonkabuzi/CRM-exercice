import { useEffect, useState } from "react";
import "../style/main.scss";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const HandleCustomerForm = ({ triggerClick, setTriggerClick }) => {
  const location = useLocation();
  const rawPath = location.pathname.split("/");
  const [dataToBeAdded, setDataToBeAdded] = useState({
    address: {
      street: "",
      number: "",
      postCode: "",
    },
    name: "",
    taxId: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { idParam } = useParams();

  const validation = () => {
    const newError = {};
    if (!dataToBeAdded.name) newError.name = "Name is required";
    if (!dataToBeAdded.taxId) newError.taxId = "TaxId is required";
    if (
      dataToBeAdded.taxId.trim().length < 11 ||
      dataToBeAdded.taxId.trim().length > 11
    )
      newError.taxId = "TaxId must be of 11 digits";
    if (!dataToBeAdded.address.street) newError.street = "Street is required";
    if (!dataToBeAdded.address.number) newError.number = "number is required";
    if (!dataToBeAdded.address.postCode)
      newError.postCode = "Post code is required";
    return newError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validation();
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
    } else {
      setErrors({});
      setTriggerClick(!triggerClick);
      rawPath[1] === "edit" ? editCustomer(idParam) : addCustomer();
    }
  };
  console.log(errors);
  const handleChange = (e) => {
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

  const addCustomer = async () => {
    try {
      await axios.post("http://localhost:8080/customers", dataToBeAdded);

      setDataToBeAdded({
        address: {
          street: "",
          number: "",
          postCode: "",
        },
        name: "",
        taxId: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSingleCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/${idParam}`
        );
        const data = response.data;
        if (data) {
          setDataToBeAdded((prev) => ({
            ...prev,
            address: {
              street: data.address.street,
              number: data.address.number,
              postCode: data.address.postCode,
            },
            name: data.name,
            taxId: data.taxId,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCustomer();
  }, []);

  const editCustomer = (customerId) => {
    try {
      axios.put(`http://localhost:8080/customers/${customerId}`, dataToBeAdded);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      <form className="form-addCustomer" onSubmit={handleSubmit}>
        {/* {message.status ? (
          <div className="message" style={{ backgroundColor: message.color }}>
            <h1>{message.color === "red" ? "Error" : "Message"}</h1>{" "}
            <p> {message.message}</p>
          </div>
        ) : (
          ""
        )} */}
        {rawPath[1] === "edit" ? <h1>Edit Customer</h1> : <h1>Add Customer</h1>}
        <label className="label-addCustomer">Name:</label>
        {errors.name && (
          <>
            <input
              type="text"
              name="name"
              value={dataToBeAdded.name || ""}
              onChange={handleChange}
            />
            <p className="message-field"> {errors.name}</p>
          </>
        )}
        <label className="label-addCustomer">tax-id:</label>
        <input
          type="text"
          name="taxId"
          value={dataToBeAdded.taxId || ""}
          onChange={handleChange}
        />
        <p className="message-field">{errors.taxId && errors.taxId} </p>
        <h2>Address</h2>
        <div className="address">
          <label className="label-addCustomer">street:</label>
          <input
            type="text"
            name="address.street"
            value={dataToBeAdded.address.street || ""}
            onChange={handleChange}
          />
          <p className="message-field">{errors.street && errors.street} </p>

          <label className="label-addCustomer">number:</label>
          <input
            type="text"
            name="address.number"
            value={dataToBeAdded.address.number || ""}
            onChange={handleChange}
          />
          <p className="message-field">{errors.number && errors.number} </p>

          <label className="label-addCustomer">code:</label>
          <input
            type="text"
            name="address.postCode"
            value={dataToBeAdded.address.postCode || ""}
            onChange={handleChange}
          />
          <p className="message-field">{errors.postCode && errors.postCode} </p>
        </div>
        <br /> <br />
        <button type="submit" className="btn">
          {rawPath[1] === "edit" ? "Save" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default HandleCustomerForm;
