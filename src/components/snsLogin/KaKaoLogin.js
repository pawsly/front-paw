import React, {useEffect, useState} from 'react';
import axios from 'axios';
import kakaoIcon from '../../public/images/kakao-icon.png';

const KakaoLogin = () => {
    const Rest_api_key = 'f6076f17fb8b4843069f31828eb5182c'; // 카카오 REST API 키 입력
    const callbackUrl = 'http://localhost:8080/app/users/kakao'; // 리디렉션 URI 입력

    const handleTokenRequest = async (code) => {
        try {
            const response = await axios.post(
                'https://kauth.kakao.com/oauth/token',
                new URLSearchParams({
                    grant_type: 'authorization_code',
                    redirect_uri: callbackUrl,
                    code: code,
                }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                }
            );
            console.log(response.data);
            localStorage.setItem('kakao_access_token', response.data.access_token);
            return response.data; // 토큰 데이터 반환
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const [user, setUser] = useState(null);

    const LoginHandler = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&callbackUrl=${callbackUrl}&response_type=code`;
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const provider = urlParams.get('provider');
        const authorizationCode = urlParams.get('code');

        if (provider === 'kakao' && authorizationCode) {
            handleTokenRequest(authorizationCode)
                .then((response) => {
                    console.log(response);
                    axios
                        .get('https://kapi.kakao.com/v2/user/me', {
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        })
                        .then((userInfo) => {
                            console.log(userInfo.data);
                            setUser(userInfo.data);
                        })
                        .catch((error) => {
                            console.error('Failed to fetch user info:', error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <img src={kakaoIcon} alt="kakao-login icon" onClick={LoginHandler}/>
    );
};

export default KakaoLogin;
