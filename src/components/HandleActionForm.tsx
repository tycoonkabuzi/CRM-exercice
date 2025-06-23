import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const HandleActionForm = () => {
  const location = useLocation();
  const rawPath = location.pathname.split("/");
  const singleActionId = rawPath[3];
  console.log(singleActionId);

  const [actionToBeAdded, setActionToBeAdded] = useState({
    contactDate: "",
    typeOfAction: "",
    description: " ",
  });
  const { id } = useParams();

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
        console.log(data);
        if (data) {
          setActionToBeAdded((prev) => ({
            ...prev,
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
  const addAction = async () => {
    const dataToSend = { ...actionToBeAdded, customer: id };
    try {
      await axios.post(`http://localhost:8080/actions`, dataToSend);
      console.log("Successfully added ");
    } catch (error) {
      console.log(error);
    }
  };

  const editAction = async () => {
    try {
      const dataToSend = { ...actionToBeAdded, customer: id };

      await axios.put(
        `http://localhost:8080/actions/${singleActionId}`,
        dataToSend
      );
      console.log("Edited successfully");
    } catch (error) {
      console.log(error);
    }
  };

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
          <button className="btn" onClick={addAction}>
            Add action
          </button>
        )}
      </form>
    </div>
  );
};

export default HandleActionForm;
