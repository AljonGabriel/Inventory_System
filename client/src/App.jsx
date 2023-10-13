import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import axios from "axios";
import {Toaster} from "react-hot-toast";
import {UserContextProvider} from "./context/userContext";
import Auth from "./auth/Auth";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position='center' toastOptions={{duration: 2000}} />
      <Routes>
        <Route
          path='/'
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
