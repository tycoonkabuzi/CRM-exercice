import "./App.css";
import AddCustomerForm from "./components/AddCustomerForm";
import ListCustomers from "./components/ListCustomers";
import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import SingleCustomer from "./components/SingleCustomer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<ListCustomers />} />
          <Route path="add" element={<AddCustomerForm />} />
          <Route path="/:id" element={<SingleCustomer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
