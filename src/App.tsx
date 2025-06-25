import "./App.css";

import ListCustomers from "./components/ListCustomers";
import { Route, Routes } from "react-router-dom";
import Home from "./layouts/Home";
import SingleCustomer from "./components/SingleCustomer";
import HandleCustomerForm from "./components/HandleCustomerForm";
import HandleActionForm from "./components/HandleActionForm";
import { useState } from "react";

function App() {
  const [triggerClick, setTriggerClick] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path=""
            element={
              <ListCustomers
                triggerClick={triggerClick}
                setTriggerClick={setTriggerClick}
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
      </Routes>
    </>
  );
}

export default App;
