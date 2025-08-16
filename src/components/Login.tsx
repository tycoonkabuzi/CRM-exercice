import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [dataToSend, setDataToSend] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleFormLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataToSend((prev) => ({ ...prev, [name]: value }));
  };

  const sendForLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        dataToSend,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="main-login-form">
        <h1> Login in</h1>
        <form className="wrapper">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleFormLogin} />
          <br />
          <br />
          <label>Password:</label>
          <input
            type={`${hidePassword ? "text" : "password"}`}
            name="password"
            onChange={handleFormLogin}
          />
          <Icon
            icon={`${hidePassword ? "mdi-light:eye" : "mdi-light:eye-off"}`}
            className="hide-password hide-login"
            onClick={() => setHidePassword(!hidePassword)}
          />
          <br /> <br />
          <button className="btn" onClick={sendForLogin}>
            {" "}
            Submit
          </button>
          <p>
            {" "}
            You don't have an account ?{" "}
            <Link to="/register">create an account </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
