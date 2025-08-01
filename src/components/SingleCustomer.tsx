import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleCustomer = ({ triggerClick, setTriggerClick }) => {
  const [data, setData] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getSingleCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/${id}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCustomer();
  }, [id, triggerClick]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const deleteAction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/actions/${id}`);
    } catch (error) {
      console.log("something went wrong, impossible to delete", error);
    }
  };
  // transform long date numerical to local date

  const formatDate = (toBeFormated) => {
    const date = new Date(toBeFormated);
    const formated = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formated;
  };
  return (
    <div className="main">
      <div>
        <h1>
          {data.name}(Tax-Id: {data.taxId})
        </h1>
        <div style={{ width: "50%" }}>
          <h2>Address</h2>
          <ul style={{ width: "100%" }}>
            <li>street: {data.address.street}</li>
            <li>Number: {data.address.number}</li>
            <li>post-code: {data.address.postCode}</li>
          </ul>
        </div>

        <br />
        <button
          onClick={() => {
            navigate(`/actions/${data._id}`);
          }}
          className="btn"
        >
          Add Action
        </button>
      </div>

      <h2>Actions</h2>
      <table>
        {data.actions.length != 0 ? (
          <thead>
            <tr>
              <th>N</th>
              <th>Date</th>
              <th>Contact type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
        ) : (
          <p style={{ textAlign: "center" }}> You have no actions</p>
        )}
        <tbody>
          {data.actions
            ? data.actions.map((action, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{formatDate(action.contactDate)}</td>
                  <td>{action.typeOfAction}</td>
                  <td>{action.description}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/action/edit/${action._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setTriggerClick(!triggerClick);
                        deleteAction(action._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : "Loading"}
        </tbody>
      </table>
    </div>
  );
};
export default SingleCustomer;
