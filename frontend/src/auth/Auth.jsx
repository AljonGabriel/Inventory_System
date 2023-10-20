import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

function Auth({children}) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // To store user information

  useEffect(() => {
    axios
      .get("/verifyUser")
      .then((response) => {
        const {data} = response;
        console.log("Auth Response", data.user);

        // Set the user data when authenticated
        setUserProfile(data.user);
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
  }, [navigate]);

  return isAuthenticated ? children(userProfile) : null;
}

export default Auth;
