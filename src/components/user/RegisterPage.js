import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ClickAwayListener from "react-click-away-listener";
import React, { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [first, setFirst] = useState(true);
  const [clickSection, setClickSection] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    id: "",
    passwd: "",
    email: "",
    phone: "",
    birth: "",
    nickname: "",
  });
  const [checkPasswd, setCheckPasswd] = useState("");
  const [passwdMode, setPasswdMode] = useState(true);
  const [rightPasswd, setRightPasswd] = useState(true);

  const handleClickAway = (e) => {
    if (e.isTrusted) {
      setClickSection("");
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.id === "checkPasswd") {
      setCheckPasswd(e.target.value);
      if (registerInfo.passwd === e.target.value) {
        setRightPasswd(true);
      } else {
        setRightPasswd(false);
      }
    } else {
      if (e.target.id === "passwd") {
        if (checkPasswd === e.target.value) {
          setRightPasswd(true);
        } else {
          setRightPasswd(false);
        }
      }
      setRegisterInfo({ ...registerInfo, [e.target.id]: e.target.value });
    }
  };

  const checkIdDuplication = () => {
    //TODO 중복확인
  };

  const moreInfo = () => {
    setFirst(false);
    // console.log(registerInfo);
  };

  return (
    <div className="register-section">
      <div className="register-section-box">
        <div className="register-section-box-title">회원가입</div>
        <ClickAwayListener onClickAway={handleClickAway}>
          {/*input 영역 하나로 묶기 위한 div*/}
          <div style={{ width: "459px" }}>
            {first ? (
              <div
                className={
                  "register-section-box-input" +
                  (clickSection === "name" ? "-active" : "")
                }
                style={{
                  backgroundColor:
                    clickSection !== "name" && registerInfo.name
                      ? "#ebebeb"
                      : "white",
                }}
              >
                <input
                  type="text"
                  className="register-section-box-input-name"
                  placeholder="이름"
                  id="name"
                  value={registerInfo.name}
                  onClick={() => setClickSection("name")}
                  onChange={onChangeHandler}
                />
              </div>
            ) : (
              <div
                className={
                  "register-section-box-input-email" +
                  (clickSection === "email" ? "-active" : "")
                }
              >
                <input
                  type="text"
                  className="register-section-box-input-email-body"
                  placeholder="이메일"
                  id="email"
                  value={registerInfo.email}
                  onClick={() => setClickSection("email")}
                  onChange={onChangeHandler}
                  style={{
                    backgroundColor:
                      clickSection !== "email" && registerInfo.email
                        ? "#ebebeb"
                        : "white",
                  }}
                />
                <span>@</span>
                <input
                  type="text"
                  className="register-section-box-input-email-domain"
                  onClick={() => setClickSection("email")}
                  style={{
                    backgroundColor:
                      clickSection !== "email" && registerInfo.email
                        ? "#ebebeb"
                        : "white",
                  }}
                />
                <button className="register-section-box-input-email-drop">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="down-icon"
                  ></FontAwesomeIcon>{" "}
                </button>
              </div>
            )}
            {/*사이 간격 클릭 시에도 active style 해지*/}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            {first ? (
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
                  id="id"
                  value={registerInfo.id}
                  onClick={() => setClickSection("id")}
                  onChange={onChangeHandler}
                  style={{
                    backgroundColor:
                      clickSection !== "id" && registerInfo.id
                        ? "#ebebeb"
                        : "white",
                  }}
                />
                <button
                  className="register-section-box-input-id-check"
                  onClick={checkIdDuplication}
                >
                  중복확인
                </button>
              </div>
            ) : (
              // 중복 css 최소화하기 위해 id와 동일한 class명 사용
              <div
                className={
                  "register-section-box-input-id" +
                  (clickSection === "nickname" ? "-active" : "")
                }
              >
                <input
                  type="text"
                  className="register-section-box-input-id-text"
                  placeholder="닉네임"
                  id="nickname"
                  value={registerInfo.nickname}
                  onClick={() => setClickSection("nickname")}
                  onChange={onChangeHandler}
                  style={{
                    backgroundColor:
                      clickSection !== "nickname" && registerInfo.nickname
                        ? "#ebebeb"
                        : "white",
                  }}
                />
                <button
                  className="register-section-box-input-id-check"
                  onClick={checkIdDuplication}
                >
                  중복확인
                </button>
              </div>
            )}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            {first ? (
              <div
                className={
                  "register-section-box-input" +
                  (clickSection === "passwd" ? "-active" : "")
                }
                style={{
                  backgroundColor:
                    clickSection !== "passwd" && registerInfo.passwd
                      ? "#ebebeb"
                      : "white",
                }}
              >
                <input
                  type={passwdMode ? "password" : "text"}
                  className="register-section-box-input-passwd"
                  placeholder="비밀번호"
                  id="passwd"
                  value={registerInfo.passwd}
                  onClick={() => setClickSection("passwd")}
                  onChange={onChangeHandler}
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
            ) : (
              <div
                className={
                  "register-section-box-input" +
                  (clickSection === "phone" ? "-active" : "")
                }
                style={{
                  backgroundColor:
                    clickSection !== "phone" && registerInfo.phone
                      ? "#ebebeb"
                      : "white",
                }}
              >
                <input
                  type="text"
                  className="register-section-box-input-passwd"
                  placeholder="연락처"
                  id="phone"
                  value={registerInfo.phone}
                  onClick={() => setClickSection("phone")}
                  onChange={onChangeHandler}
                />
              </div>
            )}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("passwdCheck")}
            ></div>
            {first ? (
              <>
                <div
                  className={
                    "register-section-box-input" +
                    (clickSection === "passwdCheck"
                      ? rightPasswd
                        ? "-active"
                        : "-active-wrong"
                      : "")
                  }
                  style={{
                    backgroundColor:
                      clickSection !== "passwdCheck" && checkPasswd
                        ? "#ebebeb"
                        : "white",
                  }}
                >
                  <input
                    type={passwdMode ? "password" : "text"}
                    className="register-section-box-input-passwd-check"
                    placeholder="비밀번호 확인"
                    id="checkPasswd"
                    value={checkPasswd}
                    onClick={() => setClickSection("passwdCheck")}
                    onChange={onChangeHandler}
                  />
                </div>
                {checkPasswd && !rightPasswd ? (
                  <span className="register-section-box-passwd-tip">
                    비밀번호가 일치하지 않습니다.
                  </span>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div
                className={
                  "register-section-box-input" +
                  (clickSection === "birth" ? "-active" : "")
                }
                style={{
                  backgroundColor:
                    clickSection !== "birth" && registerInfo.birth
                      ? "#ebebeb"
                      : "white",
                }}
              >
                <input
                  type="text"
                  className="register-section-box-input-passwd-check"
                  placeholder="생년월일 6자리"
                  id="birth"
                  value={registerInfo.birth}
                  onClick={() => setClickSection("birth")}
                  onChange={onChangeHandler}
                />
              </div>
            )}
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
