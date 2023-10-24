import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

//Routes
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Auth from "./auth/Auth.jsx";

//css
import "./style/general.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
