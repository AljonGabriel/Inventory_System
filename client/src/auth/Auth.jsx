import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

function Auth({children}) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("/verifyToken")
      .then((response) => {
        const {data} = response;
        console.log(data);

        setIsAuthenticated(true);
      })
      .catch((error) => {
        // Handle network errors or other issues
        console.error(error);

        toast.error("Please log in");
        setTimeout(() => {
          navigate("/Inventory_System/");
        }, 2000);
      });
  }, []);

  return isAuthenticated ? children : null;
}

export default Auth;
