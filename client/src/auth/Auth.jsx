import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Auth({children}) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("/verifyToken")
      .then((response) => {
        const {data} = response;
        if (data.error) {
          // Handle the case where the token is invalid or null
          console.log(data.error);
          navigate("/login");
        } else if (data.tokenValid) {
          // Token is valid, you can perform any necessary actions
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        // Handle network errors or other issues
        console.error(error);
        navigate("/login");
      });
  }, [navigate]);

  return isAuthenticated ? children : null;
}

export default Auth;
