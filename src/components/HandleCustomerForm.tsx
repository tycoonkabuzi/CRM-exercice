import { useEffect, useState } from "react";
import "../style/main.scss";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const HandleCustomerForm = ({ triggerClick, setTriggerClick }) => {
  const location = useLocation();
  const rawPath = location.pathname.split("/");
  console.log(rawPath);

  const [dataToBeAdded, setDataToBeAdded] = useState({
    address: {
      street: "",
      number: "",
      postCode: "",
    },
    name: "",
    taxId: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();
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
      setMessage((prev) => ({
        ...prev,
        message: { ...prev.message, general: ` Something Went wrong ${error}` },
      }));
    }
  };

  useEffect(() => {
    const getSingleCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/${id}`
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
      <form className="form-addCustomer">
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
        <input
          type="text"
          name="name"
          value={dataToBeAdded.name || ""}
          onChange={handleForm}
        />
        <p className="message-field"> {message.message.name}</p>
        <label className="label-addCustomer">tax-id:</label>
        <input
          type="text"
          name="taxId"
          value={dataToBeAdded.taxId || ""}
          onChange={handleForm}
        />
        <p className="message-field"> {message.message.taxId}</p>
        <h2>Address</h2>
        <div className="address">
          <label className="label-addCustomer">street:</label>
          <input
            type="text"
            name="address.street"
            value={dataToBeAdded.address.street || ""}
            onChange={handleForm}
          />
          <p className="message-field"> {message.message.street}</p>

          <label className="label-addCustomer">number:</label>
          <input
            type="text"
            name="address.number"
            value={dataToBeAdded.address.number || ""}
            onChange={handleForm}
          />
          <p className="message-field"> {message.message.number}</p>

          <label className="label-addCustomer">code:</label>
          <input
            type="text"
            name="address.postCode"
            value={dataToBeAdded.address.postCode || ""}
            onChange={handleForm}
          />
          <p className="message-field"> {message.message.number}</p>
        </div>
        <br /> <br />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            setTriggerClick(!triggerClick);

            setMessage((prev) => ({
              ...prev,
              status: true,
              color: "green",
              message: {
                ...prev.message,
                general:
                  rawPath[1] === "edit"
                    ? " Successfully edited"
                    : " Successfully added",
              },
            }));
            rawPath[1] === "edit" ? editCustomer(id) : addCustomer();
            setIsPassed(true);
          }}
        >
          {rawPath[1] === "edit" ? "Save" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default HandleCustomerForm;
