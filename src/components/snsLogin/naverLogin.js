import React, { useEffect } from 'react';
import Login from "../user/LoginPage";

const NaverLogin = ({ setGetToken, setUserInfo}) => {

    const { naver } = window
    const NAVER_CLIENT_ID = 'IgkIDmIp2xU8jyG57MEv'
    const NAVER_CALLBACK_URL = ''

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: 58},
            callbackHandle: true,
        })
        naverLogin.init()

        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                const userid = naverLogin.user.getEmail()
                const username = naverLogin.user.getName()
            }
        })
    }
    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }
    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0]
    }
    useEffect(() => {
        initializeNaverLogin()
        userAccessToken()
    }, [])

    return(
        <div id="naverIdLogin" />
    )
}
export default NaverLogin;

