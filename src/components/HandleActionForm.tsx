import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const HandleActionForm = () => {
  const location = useLocation();
  const rawPath = location.pathname.split("/");
  const params = useParams();
  const singleActionId = rawPath[3];

  const navigate = useNavigate();

  const [actionToBeAdded, setActionToBeAdded] = useState({
    customer: "",
    contactDate: "",
    typeOfAction: "",
    description: " ",
  });

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setActionToBeAdded((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const getSingleAction = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/actions/${singleActionId}`
        );
        const data = response.data;

        if (data) {
          setActionToBeAdded((prev) => ({
            ...prev,
            customer: data.customer,
            contactDate: data.contactDate,
            typeOfAction: data.typeOfAction,
            description: data.description,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleAction();
  }, []);
  console.log(actionToBeAdded.customer);
  const addAction = async () => {
    const dataToSend = { ...actionToBeAdded, customer: params.id };
    try {
      await axios.post(`http://localhost:8080/actions`, dataToSend);
      navigate(`/customer/${params.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const editAction = async () => {
    try {
      const dataToSend = { ...actionToBeAdded };
      console.log(dataToSend);
      await axios.put(
        `http://localhost:8080/actions/${singleActionId}`,
        dataToSend
      );
      await navigate(`/customer/${actionToBeAdded.customer}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(actionToBeAdded.customer);
  return (
    <div className="main">
      <form className="form-addCustomer" style={{ width: "80%" }}>
        {rawPath[2] == "edit" ? <h1> Edit Action </h1> : <h1>add Action </h1>}
        <div className="firstPartForm">
          <div className="left">
            <label className="label-addCustomer"> Date: </label>
            <input
              type="date"
              name="contactDate"
              onChange={handleData}
              value={actionToBeAdded.contactDate.split("T")[0] || ""}
            />
          </div>
          <div className="right">
            <label>Contact Type:</label>
            <select
              name="typeOfAction"
              id=""
              onChange={handleData}
              value={actionToBeAdded.typeOfAction || ""}
            >
              <option value="Call">Call</option>
              <option value="Email">Email</option>
              <option value="Message">Message</option>
            </select>
          </div>
        </div>
        <label>Description:</label>
        <textarea
          name="description"
          onChange={handleData}
          value={actionToBeAdded.description || ""}
        />
        <br /> <br />
        {rawPath[2] === "edit" ? (
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              editAction();
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              addAction();
            }}
          >
            Add action
          </button>
        )}
      </form>
    </div>
  );
};

export default HandleActionForm;
