import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tipImg from "../../assets/img/tip-img1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ClickAwayListener from "react-click-away-listener";

const Login = () => {
  const navigate = useNavigate();
  const [clickSection, setClickSection] = useState("");
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [emailState, setEmailState] = useState(false);
  const [passwdMode, setPasswdMode] = useState(true);
  const [checked, setChecked] = useState(false);

  // input 바깥 영역 누르면 모든 active style 해지
  const handleClickAway = (e) => {
    if (e.isTrusted) {
      setClickSection("");
    }
  };

  const idChange = (e) => {
    const re = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/i;

    if (e.target.value.match(re)) setEmailState(true);
    else setEmailState(false);

    setId(e.target.value);
  };

  const passwdChange = (e) => {
    console.log(e.target.value);

    setPasswd(e.target.value);
  };

  const checkHandler = (e) => {
    if (e.isTrusted) setChecked(!checked);
  };

  return (
    <div className="login-section">
      <div className="login-section-box">
        <div className="login-section-box-tip">
          <img src={tipImg} alt="first-tip img" />
          <span>Tip 바로 보기에서 원하는 페이지를 찾을 수 있어요</span>
        </div>
        <div className="login-section-box-content">
          <span className="login-section-box-content-welcome">Welcome :)</span>
          <ClickAwayListener onClickAway={handleClickAway}>
            {/*input 영역 하나로 묶기 위한 div*/}
            <div style={{ width: "359px" }}>
              <div
                className={
                  "login-section-box-content-input" +
                  (clickSection === "id" ? "-active" : "")
                }
              >
                <input
                  type="text"
                  className="login-section-box-content-input-id"
                  onClick={() => setClickSection("id")}
                  value={id}
                  onChange={idChange}
                />
                {/* TODO 정규표현식으로 아이디가 이메일 형식으로 입력됐을 경우에만 아이콘이 나타나도록 */}
                {emailState ? (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                ) : null}
              </div>
              {/*사이 간격 클릭 시에도 active style 해지*/}
              <div
                className="login-section-box-content-interval"
                onClick={() => setClickSection("")}
              ></div>
              <div
                className={
                  "login-section-box-content-input" +
                  (clickSection === "passwd" ? "-active" : "")
                }
              >
                <input
                  type={passwdMode ? "password" : "text"}
                  className="login-section-box-content-input-passwd"
                  onClick={() => setClickSection("passwd")}
                  value={passwd}
                  onChange={passwdChange}
                />
                {/*패스워드 표시 아이콘 조건부 할당*/}
                {passwdMode ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="eye-icon"
                    onClick={() => setPasswdMode(false)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="eye-icon"
                    onClick={() => setPasswdMode(true)}
                  />
                )}
              </div>
            </div>
          </ClickAwayListener>

          <div className="login-section-box-content-save">
            <input
              className="login-section-box-content-save-check"
              id="save-id"
              type="checkbox"
              checked={checked}
              onChange={checkHandler}
            />
            <label htmlFor="save-id">
              {checked ? (
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
              ) : null}
            </label>
            <span>아이디 저장</span>
          </div>

          <input
            type="button"
            className="login-section-box-content-login-btn"
            value="Login"
          />

          <div className="login-section-box-content-find">
            <span className="id">아이디 찾기</span>
            <span>|</span>
            <span className="passwd">비밀번호 찾기</span>
            <span>|</span>
            <span className="signup" onClick={() => navigate("/register")}>
              회원가입
            </span>
          </div>

          <div className="login-section-box-content-simple">
            <div className="login-section-box-content-simple-title">
              <div className="login-section-box-content-simple-title-line"></div>
              <span>간편 로그인</span>
              <div className="login-section-box-content-simple-title-line"></div>
            </div>
            <div className="login-section-box-content-simple-icon">
              {/*아이콘은 sns 로그인 적용 시 다시*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
