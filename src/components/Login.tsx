import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [dataToSend, setDataToSend] = useState({
    email: "",
    password: "",
  });

  const handleFormLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  };
  return (
    <div>
      <div className="main-login-form">
        <h1> Login in</h1>
        <form className="wrapper">
          <label>Email:</label>
          <input type="email" name="email" />
          <br />
          <br />
          <label>Password:</label>
          <input
            type={`${hidePassword ? "text" : "password"}`}
            name="password"
          />
          <Icon
            icon={`${hidePassword ? "mdi-light:eye" : "mdi-light:eye-off"}`}
            className="hide-password hide-login"
            onClick={() => setHidePassword(!hidePassword)}
          />
          <br /> <br />
          <button className="btn"> Submit</button>
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
