import "./App.css";

import ListCustomers from "./components/ListCustomers";
import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import SingleCustomer from "./components/SingleCustomer";
import HandleCustomerForm from "./components/HandleCustomerForm";
import HandleActionForm from "./components/HandleActionForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<ListCustomers />} />
          <Route path="add" element={<HandleCustomerForm />} />
          <Route path="customer/:id" element={<SingleCustomer />} />
          <Route path="actions/:id" element={<HandleActionForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
