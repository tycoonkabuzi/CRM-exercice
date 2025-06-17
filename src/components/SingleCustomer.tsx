import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleCustomer = () => {
  const [data, setData] = useState();
  const { id } = useParams();

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
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);
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
      </div>

      <h2>Actions</h2>
      <table>
        <thead>
          <tr>
            <th>N</th>
            <th>Contact Type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Monday, 12 March 2025</td>
            <td>
              I am the one I am and I am writting this as an example and nothing
              else
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Monday, 12 March 2025</td>
            <td>
              I am the one I am and I am writting this as an example and nothing
              else
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Monday, 12 March 2025</td>
            <td>
              I am the one I am and I am writting this as an example and nothing
              else
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Monday, 12 March 2025</td>
            <td>
              I am the one I am and I am writting this as an example and nothing
              else
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default SingleCustomer;
