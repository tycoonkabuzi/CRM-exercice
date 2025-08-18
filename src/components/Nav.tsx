import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import api from "../middleware/api";
import { useContext } from "react";
import AuthContext from "../context/authProvider";

const Nav = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    try {
      api.post("/user/logout");
      navigate("/login");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

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
      </ul>

      <div className="logout">
        <Icon
          icon="material-symbols-light:logout-sharp"
          width={"25px"}
          onClick={handleLogout}
        ></Icon>
      </div>
    </div>
  );
};
export default Nav;
