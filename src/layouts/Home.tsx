import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};
export default Home;
