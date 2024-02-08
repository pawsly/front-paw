import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ClickAwayListener from "react-click-away-listener";
import React, { useState } from "react";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [clickSection, setClickSection] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    id: "",
    passwd: "",
    email: "",
    domain: "",
    nickname: "",
    phone: "",
    birth: "",
  });
  const [checkPasswd, setCheckPasswd] = useState("");
  const [passwdMode, setPasswdMode] = useState(true);
  const [rightPhone, setRightPhone] = useState(true);
  const [rightPasswd, setRightPasswd] = useState(true);
  const domainOption = [
    { NAVER: "naver.com" },
    { QWER: "놀고싶어놀고싶어" },
    { GOOGLE: "gmail.com" },
  ];
  const [domainOpenState, setDomainOpenState] = useState(false);

  const handleClickAway = (event) => {
    if (event.isTrusted) {
      setClickSection("");
    }
  };

  const onChangeHandler = (event) => {
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

      setRegisterInfo({
        ...registerInfo,
        [event.target.id]: event.target.value,
      });

      if (event.target.id === "phone") {
        let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (regPhone.test(registerInfo.phone) === true) {
          console.log(registerInfo.phone);
          setRightPhone(true);
        } else {
          console.log(registerInfo.phone);
          setRightPhone(false);
        }
      }
    }
  };

  const onOptionSelectHandler = (option) => {
    setRegisterInfo((current) => {
      let newInfo = { ...current };
      newInfo["domain"] = option;
      return newInfo;
    });
  };

  const checkIdDuplication = () => {
    //TODO 중복확인
  };

  const doSign = async () => {
    if (!rightPhone) {
      window.alert(
        "연락처가 정상적으로 작성되지 않았습니다.\n다시 확인해 주세요."
      );

      return false;
    }

    let data = {
      name: registerInfo.name,
      userid: registerInfo.id,
      password: registerInfo.passwd,
      email: registerInfo.email + "@" + registerInfo.domain.domain,
      nickname: registerInfo.nickname,
      phone: registerInfo.phone,
      birth: registerInfo.birth,
    };

    const res = await apiClient("/user/signup", data);
    if (res) {
      if (res.status === 200) {
        movePage(2);
      } else {
        window.alert("이미 가입된 아이디입니다.");
      }
    }
  };

  const movePage = (n) => {
    const registerInfoKey = {
      name: "이름",
      id: "아이디",
      passwd: "비밀번호",
      email: "이메일",
      domain: "도메인",
      nickname: "닉네임",
      phone: "연락처",
      birth: "생년월일",
    };

    if (n > 0) {
      for (let key in registerInfo) {
        if (n === 1 && key === "email") break;
        if (!registerInfo[key]) {
          window.alert(registerInfoKey[key] + " 값이 비어 있습니다.");
          return false;
        } else if (!rightPasswd) {
          window.alert(
            "비밀번호 확인이 정상적으로 이루어지지 않았습니다.\n다시 확인해 주세요."
          );

          return false;
        }
      }
    }

    setPage(n);
  };

  return (
    <div className="register-section">
      {page < 2 ? (
        <div className="register-section-box">
          <div className="register-section-box-title">회원가입</div>
          <ClickAwayListener onClickAway={handleClickAway}>
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
                    onChange={onChangeHandler}
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
                    placeholder="도메인"
                    id="domain"
                    value={registerInfo.domain}
                    onClick={() => setClickSection("email")}
                    onChange={onChangeHandler}
                    style={{
                      backgroundColor:
                        clickSection !== "email" && registerInfo.email
                          ? "#ebebeb"
                          : "white",
                    }}
                  />
                  <button
                    className="register-section-box-input-email-drop"
                    onClick={() => setDomainOpenState(!domainOpenState)}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="down-icon"
                    ></FontAwesomeIcon>
                  </button>
                  <div
                    className={
                      "register-section-box-input-email-option" +
                      (domainOpenState ? "-active" : "")
                    }
                  >
                    {domainOption.map((option, index) => (
                      <div
                        onClick={() =>
                          onOptionSelectHandler(Object.values(option)[0])
                        }
                        key={index}
                      >
                        {Object.values(option)[0]}
                      </div>
                    ))}
                  </div>
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
              ) : page === 1 ? (
                <div>
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
                  {!rightPhone ? (
                    <span className="register-section-box-input-tip">
                      연락처 11자리를 정확히 입력해 주세요.
                    </span>
                  ) : (
                    <></>
                  )}
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
                    onChange={onChangeHandler}
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
              onClick={() => {
                if (!page) {
                  movePage(1);
                } else {
                  doSign();
                }
              }}
            >
              {!page ? "다음" : "가입하기"}
            </button>
          </div>
        </div>
      ) : (
        <div className="register-section-success">
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
          <span className="register-section-success-msg">
            회원가입이 <b>완료</b>되었습니다
          </span>
          <div className="register-section-success-user">
            <span>{registerInfo.name} 님의 가입을 축하합니다.</span>
            <span>로그인한 후 서비스를 이용하실 수 있습니다.</span>
          </div>
          <div className="register-section-success-line"></div>
          <div className="register-section-success-btn">
            <button
              className="register-section-success-btn-home"
              onClick={() => navigate("/")}
            >
              홈으로
            </button>
            <button
              className="register-section-success-btn-login"
              onClick={() => navigate("/")}
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
