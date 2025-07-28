import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="main-nav">
      <div>
        <h1>
          <Link className="link" to="/customers">
            CRM system
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link className="link" to="/customers">
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
