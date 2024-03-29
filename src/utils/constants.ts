export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WSS_BASE_URL = 'wss://norma.nomoreparties.space';

export const INGREDIENTS_URL = BASE_URL + '/ingredients';
export const ORDER_URL = `${BASE_URL}/orders`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const TOKEN_URL = `${BASE_URL}/auth/token`;

export const PROFILE_URL = `${BASE_URL}/auth/user`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password-reset`;
export const RESET_PASSWORD_SET_URL = `${BASE_URL}/password-reset/reset`;

export const WS_ALL_ORDERS_URL = `${WSS_BASE_URL}/orders/all`;
export const WS_USER_ORDERS_URL = `${WSS_BASE_URL}/orders`;

export const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const WS_NORMAL_CLOSE_CODE = 1000;