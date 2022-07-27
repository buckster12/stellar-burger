import {TOKEN_URL} from "../utils/constants";
import checkResponse from "../utils/check-response";
import Cookies from 'js-cookie';

export function getCookie(name) {
    return Cookies.get(name);
}

export const saveTokens = (refreshToken, accessToken) => {
    // if accessToken contains Bearer, remove it
    if (accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.split("Bearer ")[1];
    }
    const inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set('accessToken', accessToken, {
        expires: inTwentyMinutes
    });
    localStorage.setItem('refreshToken', refreshToken);
}

export const refreshTokenRequest = () => {
    return fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(res => {
            return checkResponse(res);
        }).catch(error => {
            console.log('error in auth.js:31: ', error);
            if (error.success === false) {
                saveTokens(null, null);
                window.location.replace('/login');
                return {};
            }
        });
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);

        return await checkResponse(res);
    } catch (err) {
        console.log('error in auth.js:45: ', err);
        if (err.message === 'jwt expired') {
            const {refreshToken, accessToken} = await refreshTokenRequest();
            saveTokens(refreshToken, accessToken);

            options.headers.authorization = accessToken;

            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}
