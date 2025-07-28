import "./App.css";

import ListCustomers from "./components/ListCustomers";
import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import SingleCustomer from "./components/SingleCustomer";
import HandleCustomerForm from "./components/HandleCustomerForm";
import HandleActionForm from "./components/HandleActionForm";
import { useState } from "react";
import ConfirmationMessage from "./components/ConfirmationMessage";
import Pagination from "./components/PaginationComponent";
import PaginationComponent from "./components/PaginationComponent";

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
            path="edit/:id"
            element={
              <HandleCustomerForm
                triggerClick={triggerClick}
                setTriggerClick={setTriggerClick}
              />
            }
          />
          <Route
            path="customer/:id"
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
        <Route path="/test" element={<PaginationComponent />} />
      </Routes>
    </>
  );
}

export default App;
