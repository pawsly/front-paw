import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ClickAwayListener from "react-click-away-listener";
import React, { useState } from "react";

const Register = () => {
  const [clickSection, setClickSection] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdMode, setPasswdMode] = useState(true);
  const [checkPw, setCheckPw] = useState("");

  const handleClickAway = (e) => {
    if (e.isTrusted) {
      setClickSection("");
    }
  };

  const checkIdDuplication = () => {
    //TODO 중복확인
  };

  const moreInfo = () => {
    //TODO 추가 정보 입력
  };

  return (
    <div className="register-section">
      <div className="register-section-box">
        <div className="register-section-box-title">회원가입</div>
        <ClickAwayListener onClickAway={handleClickAway}>
          {/*input 영역 하나로 묶기 위한 div*/}
          <div style={{ width: "459px" }}>
            <div
              className={
                "register-section-box-input" +
                (clickSection === "name" ? "-active" : "")
              }
            >
              <input
                type="text"
                className="register-section-box-input-name"
                placeholder="이름"
                onClick={() => setClickSection("name")}
                onChange={() => setName(name)}
              />
            </div>
            {/*사이 간격 클릭 시에도 active style 해지*/}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            <div
              className={
                "register-section-box-input-id" +
                (clickSection === "id" ? "-active" : "")
              }
            >
              <input
                type="text"
                className="register-section-box-input-id-text"
                placeholder="아이디"
                onClick={() => setClickSection("id")}
                onChange={() => setId(id)}
              />
              <button
                className="register-section-box-input-id-check"
                onClick={checkIdDuplication}
              >
                중복확인
              </button>
            </div>
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            <div
              className={
                "register-section-box-input" +
                (clickSection === "passwd" ? "-active" : "")
              }
              style={
                clickSection !== "passwd" ? { backgroundColor: "#ebebeb" } : {}
              }
            >
              <input
                type={passwdMode ? "password" : "text"}
                className="register-section-box-input-passwd"
                placeholder="비밀번호"
                onClick={() => setClickSection("passwd")}
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
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            <div
              className={
                "register-section-box-input" +
                (clickSection === "passwdCheck" ? "-active" : "")
              }
            >
              <input
                type={passwdMode ? "password" : "text"}
                className="register-section-box-input-passwd-check"
                placeholder="비밀번호 확인"
                onClick={() => setClickSection("passwdCheck")}
              />
            </div>
          </div>
        </ClickAwayListener>

        <button className="register-section-box-next" onClick={moreInfo}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Register;
