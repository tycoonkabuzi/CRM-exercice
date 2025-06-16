import "../style/main.scss";
const AddCustomerForm = () => {
  return (
    <div className="main">
      <form className="form-addCustomer">
        <h1>Add Customer</h1>
        <label className="label-addCustomer">Name:</label>
        <input type="text" />
        <label>tax-id:</label>
        <input type="text" />
        <h2>Address</h2>
        <div className="address">
          <label className="label-addCustomer">street:</label>
          <input type="text" />
          <label className="label-addCustomer">number:</label>
          <input type="text" />
          <label className="label-addCustomer">code:</label>
          <input type="text" />
        </div>
        <br /> <br />
        <button className="btn"> Submit</button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
