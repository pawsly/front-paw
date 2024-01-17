import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./components/user/RegisterPage";
import Main from "./components/common/MainPage";
import Write from "./components/board/WritePage";
import PersonalFeed from "./components/user/PersonalFeedPage";
import LoginPage from "./components/user/LoginPage";
import MyFeed from "./components/user/MyFeedPage";
import SetProfile from "./components/user/SetProfilePage";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";
import AppWrapper from "./AppWrapper";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
    path: "/personal/:userKey",
    element: <PersonalFeed />,
  },
  {
    path: "/myfeed/:userKey",
    element: <MyFeed />,
  },
  {
    path: "/setting/:userKey",
    element: <SetProfile />,
  },
  {
    path: "/write",
    element: <Write />,
  },
]);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/*<AppWrapper router={router} /> /!* AppWrapper 컴포넌트를 사용합니다. *!/*/}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </CookiesProvider>
);
