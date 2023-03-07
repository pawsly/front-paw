import "./assets/css/index.css";
import React from "react";
import Login from "./components/user/LoginPage";

const App = () => {
  return (
    <div className="app">
      <div>성경 씨 안녕하세요</div>
      <Login />
    </div>
  );
};

export default App;
