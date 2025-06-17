import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="main-nav">
      <div>
        <h1>CRM system</h1>
      </div>
      <ul>
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/add">
            Add Customer
          </Link>
        </li>
        <li>Logout</li>
      </ul>
    </div>
  );
};
export default Nav;
