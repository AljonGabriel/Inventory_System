import axios from "axios";

import {ToastContainer} from "react-toastify";
import {Flip} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {Outlet, Routes} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import {Container} from "react-bootstrap";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Flip}
      />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
