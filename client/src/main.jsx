import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

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

const router = createBrowserRouter([
  {
    path: "/Inventory_System/",
    element: <App />,
    children: [
      {
        path: "/Inventory_System/",
        element: <Login />,
      },
      {
        path: "/Inventory_System/register",
        element: <Register />,
      },
      {
        path: "/Inventory_System/dashboard",
        element: (
          <Auth>
            <Dashboard />
          </Auth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
