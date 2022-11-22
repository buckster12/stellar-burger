import {TOKEN_URL} from "../utils/constants";
import checkResponse from "../utils/check-response";
import Cookies from 'js-cookie';

export function getCookie(name: string) {
    return Cookies.get(name);
}

interface IRefreshToken {
    refreshToken: string;
    accessToken: string;
}

export const saveTokens = (refreshToken: string, accessToken: string): void => {
    // if accessToken contains Bearer, remove it
    if (accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.split("Bearer ")[1];
    }
    const inTwentyMinutes: Date = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set('accessToken', accessToken, {
        expires: inTwentyMinutes,
        sameSite: 'None',
        secure: true
    });
    localStorage.setItem('refreshToken', refreshToken);
}

export const refreshTokenRequest = async (): Promise<IRefreshToken> => {
    try {
        const res = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        });
        return await checkResponse<IRefreshToken>(res);
    } catch (error: any) {
        console.log('error in auth.js:31: ', error);
        if (error.success === false) {
        }
    }
    saveTokens("", "");
    window.location.replace('/login');
    return {"refreshToken": "", "accessToken": ""};
}

export async function fetchWithRefresh<T>(url: string, options: RequestInit): Promise<T> {
    try {
        const res = await fetch(url, options);

        return await checkResponse<T>(res);
    } catch (err: any) {
        console.log('error in auth.js:54: ', err);
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
            const {refreshToken, accessToken}: IRefreshToken = await refreshTokenRequest();
            saveTokens(refreshToken, accessToken);

            // @ts-ignore
            options.headers.authorization = accessToken;

            const res = await fetch(url, options);
            return await checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
}
