import axios from "axios";
import {Toaster} from "react-hot-toast";

import {Outlet} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position='top-right' toastOptions={{duration: 5000}} />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
