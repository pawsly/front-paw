import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tipImg from "../../public/images/tip-img1.png";
import googleIcon from "../../public/images/google-icon.png";
import kakaoIcon from "../../public/images/kakao-icon.png";
import naverIcon from "../../public/images/naver-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ClickAwayListener from "react-click-away-listener";
import axios from "axios";
import NaverLogin from "../snsLogin/NaverLogin";

const Login = () => {
  const navigate = useNavigate();
  const [clickSection, setClickSection] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    passwd: "",
  });
  const [emailState, setEmailState] = useState(false);
  const [passwdMode, setPasswdMode] = useState(true);
  const [checked, setChecked] = useState(false);

  // input 바깥 영역 누르면 모든 active style 해지
  const clickAwayHandler = (event) => {
    if (event.isTrusted) {
      setClickSection("");
    }
  };

  const loginInfoChangeHandler = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.id]: event.target.value });
  };

  const idChangeHandler = (event) => {
    const re = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/i;

    if (event.target.value.match(re)) setEmailState(true);
    else setEmailState(false);

    loginInfoChangeHandler(event);
  };

  const checkHandler = (event) => {
    if (event.isTrusted) setChecked(!checked);
  };

  const handleTokenRequest = async (code) => {
    try {
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000",
          code: code,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            // 'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response.data); // 토큰 데이터 출력
    } catch (error) {
      console.error(error);
    }
  };

  const KaKaoLogin = () => {
    const handleLogin = () => {
      const Rest_api_key = "f6076f17fb8b4843069f31828eb5182c"; // 카카오 REST API 키 입력
      const redirect_uri = "http://localhost:3000"; // 리디렉션 URI 입력
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

      window.location.href = kakaoURL;
    };

    // URL에서 코드 파싱 및 토큰 요청
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const provider = urlParams.get("provider");
      const authorizationCode = urlParams.get("code");

      if (provider === "kakao" && authorizationCode) {
        handleTokenRequest(authorizationCode)
          .then((response) => {
            console.log(response.data); // 토큰 데이터 출력
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, []);

    return <img src={kakaoIcon} alt="kakao-login icon" onClick={handleLogin} />;
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
          <ClickAwayListener onClickAway={clickAwayHandler}>
            {/*input 영역 하나로 묶기 위한 div*/}
            <div style={{ width: "359px" }}>
              <div
                className={
                  "login-section-box-content-input" +
                  (clickSection === "id" ? "-active" : "")
                }
                style={{
                  backgroundColor:
                    clickSection !== "id" && loginInfo.id ? "#ebebeb" : "white",
                }}
              >
                <input
                  type="text"
                  className="login-section-box-content-input-id"
                  placeholder="아이디"
                  id="id"
                  value={loginInfo.id}
                  onClick={() => setClickSection("id")}
                  onChange={idChangeHandler}
                />
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
                style={{
                  backgroundColor:
                    clickSection !== "passwd" && loginInfo.passwd
                      ? "#ebebeb"
                      : "white",
                }}
              >
                <input
                  type={passwdMode ? "password" : "text"}
                  className="login-section-box-content-input-passwd"
                  placeholder="비밀번호"
                  id="passwd"
                  value={loginInfo.passwd}
                  onClick={() => setClickSection("passwd")}
                  onChange={loginInfoChangeHandler}
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
              <img src={googleIcon} alt="google-login icon" />
              <img src={naverIcon} alt="naver-login icon" />
              <KaKaoLogin />
              <NaverLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
