import React, { useEffect } from 'react';

const NaverLogin = () => {

    const { naver } = window; //js 에 있는 naver 선언
    const NAVER_CLIENT_ID = 'IgkIDmIp2xU8jyG57MEv';
    const NAVER_CALLBACK_URL = "http://localhost:8080/login.oauth2/code/naver";

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: 58},
            callbackHandle: true,
        })
        naverLogin.init();
    }
    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken();
    };
    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0];
        console.log(token);
    }
    useEffect(() => {
        initializeNaverLogin();
        userAccessToken();
    }, []);

    return(
        <div id="naverIdLogin" />
    )
}
export default NaverLogin;

