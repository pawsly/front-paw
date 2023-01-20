import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const state = {
    clickState: "",
  };

  const clickInput = (place) => {
    state.clickState = place;
  };

  return (
    <div className="login-section">
      <div className="login-section-box">
        <div className="login-section-box-tip"></div>
        <div className="login-section-box-content">
          <span className="login-section-box-content-welcome">Welcome :)</span>
          <div
            className={
              state.clickState === "id"
                ? "login-section-box-content-input-active"
                : "login-section-box-content-input"
            }
            onClick={() => clickInput("id")}
          >
            <input type="text" className="login-section-box-content-input-id" />
            {/* TODO 정규표현식으로 아이디가 이메일 형식으로 입력됐을 경우에만 아이콘이 나타나도록 */}
            <FontAwesomeIcon icon={faCheck} className="check-icon" />
          </div>
          <div
            className={
              state.clickState === "passwd"
                ? "login-section-box-content-input-active"
                : "login-section-box-content-input"
            }
            onClick={() => clickInput("passwd")}
          >
            <input
              type="password"
              className="login-section-box-content-input-passwd"
            />
            <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
