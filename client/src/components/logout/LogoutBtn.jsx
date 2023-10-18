import {useNavigate} from "react-router-dom";
import axios from "axios";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      navigate("/Inventory_System/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className='btn btn-outline-danger mx-2' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
