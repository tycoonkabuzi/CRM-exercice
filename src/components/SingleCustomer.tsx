const SingleCustomer = () => {
  return (
    <div className="main">
      <h1>Aksanti Kabuzi (Tax-Id: 39485) </h1>
      <div style={{ width: "50%" }}>
        <h2>Address</h2>
        <ul style={{ width: "100%" }}>
          <li>street: Jadwigi z lobzowa</li>
          <li>Number: 60/134</li>
          <li>post-code: 30-134</li>
        </ul>
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
