import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [dataToSend, setDataToSend] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataToSend((prev) => ({ ...prev, [name]: value }));
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user/register", dataToSend);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-login-form">
      <h1> Sign up</h1>
      <form className="wrapper">
        <label>Name:</label>
        <input type="text" name="name" onChange={handleFormData} />
        <br />
        <br />
        <label>Email:</label>
        <input type="email" name="email" onChange={handleFormData} />
        <br />
        <br />
        <label>Password:</label>
        <input
          type={`${hidePassword ? "text" : "password"}`}
          name="password"
          onChange={handleFormData}
        />
        <Icon
          icon={`${hidePassword ? "mdi-light:eye" : "mdi-light:eye-off"}`}
          className="hide-password"
          onClick={() => setHidePassword(!hidePassword)}
        />
        <br /> <br />
        <button className="btn" onClick={register}>
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Register;
