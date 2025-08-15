import "./App.css";

import ListCustomers from "./components/ListCustomers";
import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import SingleCustomer from "./components/SingleCustomer";
import HandleCustomerForm from "./components/HandleCustomerForm";
import HandleActionForm from "./components/HandleActionForm";
import { useState } from "react";
import ConfirmationMessage from "./components/ConfirmationMessage";

import PaginationComponent from "./components/PaginationComponent";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [triggerClick, setTriggerClick] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path={`/customers`}
            element={
              <ListCustomers
                triggerClick={triggerClick}
                setTriggerClick={setTriggerClick}
              />
            }
          />
          <Route
            path="delete/:id"
            element={
              <ConfirmationMessage
                setTriggerClick={setTriggerClick}
                triggerClick={triggerClick}
              />
            }
          />
          <Route
            path="add"
            element={
              <HandleCustomerForm
                triggerClick={triggerClick}
                setTriggerClick={setTriggerClick}
              />
            }
          />
          <Route
            path="customers/edit/:id"
            element={
              <HandleCustomerForm
                triggerClick={triggerClick}
                setTriggerClick={setTriggerClick}
              />
            }
          />
          <Route
            path="customers/customer/:id"
            element={
              <SingleCustomer
                triggerClick={triggerClick}
                setTriggerClick={setTriggerClick}
              />
            }
          />

          <Route path="actions/:id" element={<HandleActionForm />} />
          <Route path="action/edit/:id" element={<HandleActionForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
