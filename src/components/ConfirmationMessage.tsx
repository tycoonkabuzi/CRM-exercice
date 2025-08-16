import { useNavigate, useParams } from "react-router-dom";
import deleteAudio from "../assets/audio/FaceTime Hang Up (Apple Sound) - Sound Effect for editing.wav";
import api from "../middleware/api";
const ConfirmationMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteCustomer = async () => {
    const soundDelete = new Audio(deleteAudio);
    try {
      await api.delete(`/customers/${id}`);
      navigate("/customers");
      soundDelete.play();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-message">
      <div className="main-message--container">
        <h1>Delete</h1>
        <p>Are you sure you would like to delete</p>
        <br />
        <div className="main-message--container--buttons">
          <button className="btn red-btn" onClick={deleteCustomer}>
            Yes
          </button>
          <button
            className="btn gray-btn"
            onClick={() => navigate("/customers")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
