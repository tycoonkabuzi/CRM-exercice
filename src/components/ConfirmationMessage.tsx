import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import deleteAudio from "../assets/audio/FaceTime Hang Up (Apple Sound) - Sound Effect for editing.wav";
const ConfirmationMessage = ({ setTriggerClick, triggerClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteCustomer = async () => {
    const soundDelete = new Audio(deleteAudio);
    try {
      await axios.delete(`http://localhost:8080/customers/${id}`);
      navigate("/");
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
          <button className="btn gray-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
