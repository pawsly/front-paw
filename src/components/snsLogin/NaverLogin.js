/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import naverIcon from'../../public/images/naver-icon.png'

const NaverLogin = () => {
  const { naver } = window; //js 에 있는 naver 선언
  const NAVER_CLIENT_ID = "lgklDmIp2xU8jyG57MEv";
  const REDIRECT_URI = "http://localhost:8080/user/naver";
  const [user, setUser] = useState(null);
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile`;

  const naverLogout = () => {
    localStorage.removeItem("com.naver.nid.access_token");
    window.location.reload();
  };
  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  useEffect(() => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "lgklDmIp2xU8jyG57MEv",
      callbackUrl: "http://localhost:8080/user/naver",
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 58 },
    });
    naverLogin.init();
    // naverLogout();
    try {
      naverLogin.getLoginStatus((status) => {
        if (status) {
          console.log(naverLogin.user);
        }
      });
    } catch (err) {
      console.log(err);
    }

    //   naverLogin.getLoginStatus((status) => {
    //     if (status) {
    //       console.log(naverLogin.user);
    //       setUser({ ...naverLogin.user });
    //     }
    //   })
    // };

  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>네이버 로그인 성공!</h2>
          <h3>사용자 이름</h3>
          <div>{user.name}</div>
          <h3>사용자 이메일</h3>
          <div>{user.email}</div>
          <h3>사용자 프로필 사진</h3>
          <img src={user.profile} alt="프로필 사진" />
          {/*<button onClick={naverLogout}>로그아웃</button>*/}
        </div>
      ) : (
        <div>
          <div id="naverIdLogin"></div>
        </div>
      )}
    </div>
  );
};

export default NaverLogin;
