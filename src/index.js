import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mainLogo from "./public/images/logo.png";
import App from "./App";
import Register from "./components/user/RegisterPage";
import FeedMain from "./components/user/FeedMainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/main",
    element: <FeedMain />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <span className="title">
      <img
        src={mainLogo}
        alt="main Logo"
        onClick={() => (window.location = "/")}
      />
    </span>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>
);
