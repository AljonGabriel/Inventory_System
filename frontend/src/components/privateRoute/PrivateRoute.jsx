import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {toast} from "react-toastify";

const PrivateRoute = () => {
  const {userInfo} = useSelector((state) => state.auth);

  if (!userInfo) {
    toast.error("Please log-in");
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
