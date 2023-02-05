import "./assets/css/index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import mainLogo from "./assets/img/logo.png";
import Login from "./components/user/LoginPage";

const App = () => {
  return (
    <div className="app">
      <span className="title">
        <img src={mainLogo} alt="main Logo" />
      </span>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
