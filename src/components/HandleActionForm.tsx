import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const HandleActionForm = () => {
  const [actionTobeAdded, setActionToBeAdded] = useState({
    contactDate: "",
    typeOfAction: "",
    description: " ",
  });
  const { id } = useParams();
  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setActionToBeAdded((prev) => ({ ...prev, [name]: value, customer: id }));
  };

  const addAction = () => {
    try {
      axios.post(`http://localhost:8080/actions`, actionTobeAdded);
      console.log("Successfully added ");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      <form className="form-addCustomer" style={{ width: "80%" }}>
        <h1>Add Action</h1>
        <div className="firstPartForm">
          <div className="left">
            <label className="label-addCustomer"> Date: </label>
            <input type="date" name="contactDate" onChange={handleData} />
          </div>
          <div className="right">
            <label>Contact Type:</label>
            <select name="typeOfAction" id="" onChange={handleData}>
              <option value="Call">Call</option>
              <option value="Email">Email</option>
              <option value="Message">Message</option>
            </select>
          </div>
        </div>
        <label>Description:</label>
        <textarea name="description" onChange={handleData} />
        <br /> <br />
        <button className="btn">Add action</button>
      </form>
    </div>
  );
};

export default HandleActionForm;
