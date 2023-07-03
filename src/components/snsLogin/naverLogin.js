import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";

const NaverLogin =  () =>{

    const { naver } = window; //js 에 있는 naver 선언
    const NAVER_CLIENT_ID = 'lgklDmIp2xU8jyG57MEv';
    const NAVER_CALLBACK_URL = `http://localhost:8080/login.oauth2/code/naver`;
    const [user,setUser] = useState(null);

    // const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: 58},
        })

    const getUser = async () => {
            await naverLogin.getLoginStatus((status) => {
                console.log(`로그인 : ${status}`);
                if(status) {
                    setUser({ ...naverLogin.user});
                    window.opener.location.href = "http://localhost:8080";
                    window.close();
                }
            });
    };

        // naverLogin.init();
    // }
    // const userAccessToken = () => {
    //     window.location.href.includes('access_token') && getToken();
    // };
    // const getToken = () => {
    //     const token = window.location.href.split('=')[1].split('&')[0];
    //     console.log(token);
    // }
    useEffect(() => {
        naverLogin.init();
        console.log("init");
        getUser();
        // initializeNaverLogin();
        // userAccessToken();
    }, []);

    return (
        <div>{ user ? (
                <div>
                <h2>네이버 로그인 성공!</h2>
                <h3>사용자 이름</h3>
                <div>{user.name}</div>
                <h3>사용자 이메일</h3>
                <div>{user.email}</div>
                <h3>사용자 프로필 사진</h3>
                <img src={user.profile} alt="프로필 사진"/>
                {/*<button onClick={naverLogout}>로그아웃</button>*/}
            </div>)
        : (<div> <div id='naverIdLogin'></div></div>)
        }</div>
    );
};

export default NaverLogin;

