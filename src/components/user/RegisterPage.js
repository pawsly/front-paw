import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ClickAwayListener from "react-click-away-listener";
import React, { useState } from "react";
import {faCheck, faChevronDown} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [page, setPage] = useState(0);
  const [clickSection, setClickSection] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    id: "",
    passwd: "",
    email: "",
    nickname: "",
    phone: "",
    birth: "",
  });
  const [checkPasswd, setCheckPasswd] = useState("");
  const [passwdMode, setPasswdMode] = useState(true);
  const [rightPasswd, setRightPasswd] = useState(true);

  const clickAwayHandler = (event) => {
    if (event.isTrusted) {
      setClickSection("");
    }
  };

  const registerInfoChangeHandler = (event) => {
    if (event.target.id === "checkPasswd") {
      setCheckPasswd(event.target.value);
      if (registerInfo.passwd === event.target.value) {
        setRightPasswd(true);
      } else {
        setRightPasswd(false);
      }
    } else {
      if (event.target.id === "passwd") {
        if (checkPasswd === event.target.value) {
          setRightPasswd(true);
        } else {
          setRightPasswd(false);
        }
      }
      setRegisterInfo({ ...registerInfo, [event.target.id]: event.target.value });
    }
  };

  const checkIdDuplication = () => {
    //TODO 중복확인
  };

  const movePage = (number) => {
    const registerInfoKey = {
      name: '이름',
      id: "아이디",
      passwd: "비밀번호",
      email: "이메일",
      nickname: "닉네임",
      phone: "연락처",
      birth: "생년월일",
    }

    if (number > 0) {
      for (let key in registerInfo) {
        if (number === 1 && key === 'email') break;
        if (!registerInfo[key]) {
          window.alert(registerInfoKey[key] + " 값이 비어 있습니다.");
          return false;
        } else if (!rightPasswd) {
          window.alert("비밀번호 확인이 정상적으로 이루어지지 않았습니다.\n다시 확인해 주세요.");
          return false;
        }
      }
    }

    setPage(number);
  };

  return (
    <div className="register-section">
      { page < 2 ? (<div className="register-section-box">
        <div className="register-section-box-title">회원가입</div>
        <ClickAwayListener onClickAway={clickAwayHandler}>
          {/*input 영역 하나로 묶기 위한 div*/}
          <div style={{ width: "459px" }}>
            {!page ? (
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
                  onChange={registerInfoChangeHandler}
                />
              </div>
            ) : page === 1 ? (
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
                  onChange={registerInfoChangeHandler}
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
            ) : (
              <></>
            )}
            {/*사이 간격 클릭 시에도 active style 해지*/}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            {!page ? (
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
                  onChange={registerInfoChangeHandler}
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
            ) : page === 1 ? (
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
                  onChange={registerInfoChangeHandler}
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
            ) : (
              <></>
            )}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("")}
            ></div>
            {!page ? (
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
                  onChange={registerInfoChangeHandler}
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
            ) : page === 1 ? (
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
                  onChange={registerInfoChangeHandler}
                />
              </div>
            ) : (
              <></>
            )}
            <div
              className="register-section-box-interval"
              onClick={() => setClickSection("passwdCheck")}
            ></div>
            {!page ? (
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
                    onChange={registerInfoChangeHandler}
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
            ) : page === 1 ? (
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
                  onChange={registerInfoChangeHandler}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </ClickAwayListener>

        <div className="register-section-box-btn">
          {page === 1 ? (
            <button
              className="register-section-box-btn-prev"
              onClick={() => movePage(0)}
            >
              이전
            </button>
          ) : (
            <></>
          )}
          <button
            className="register-section-box-btn-next"
            onClick={() => movePage(!page ? 1 : 2)}
          >
            { !page ? '다음' : '가입하기' }
          </button>
        </div>
      </div>):(<div className='register-section-success'>
        <FontAwesomeIcon
            icon={faCheck}
            className="check-icon"
        />
        <span className='register-section-success-msg'>회원가입이 <b>완료</b>되었습니다</span>
        <div className='register-section-success-user'>
          <span>{registerInfo.name} 님의 가입을 축하합니다.</span>
          <span>로그인한 후 서비스를 이용하실 수 있습니다.</span>
        </div>
        <div className='register-section-success-line'></div>
        <div className='register-section-success-btn'>
          <button className='register-section-success-btn-home'>홈으로</button>
          <button className='register-section-success-btn-login'>로그인</button>
        </div>
      </div>)}
    </div>
  );
};

export default Register;
