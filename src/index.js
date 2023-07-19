import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./components/user/RegisterPage";
import Main from "./components/common/MainPage";
import Write from "./components/board/WritePage";

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
    element: <Main />,
  },
  {
    path: "/write",
    element: <Write />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/*<span className="title">*/}
    {/*  <img*/}
    {/*    src={mainLogo}*/}
    {/*    alt="main Logo"*/}
    {/*    onClick={() => (window.location = "/")}*/}
    {/*  />*/}
    {/*</span>*/}
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>
);
