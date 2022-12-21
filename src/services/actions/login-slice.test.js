import Cookies from "js-cookie";
import loginReducer, {login} from "./login-slice";

describe("loginSlice", () => {
    const initialState = {
        email: "",
        password: "",
        passwordVisible: false,
        error: null,
        isLoading: false,
        isLoggedIn: (Cookies.get('accessToken') || "").length > 0,
    };
    it("should return the initial state", () => {
        expect(loginReducer(undefined, {})).toEqual(initialState);
    });

    it("setIsLoggedIn", () => {
        const action = {
            type: "login/setIsLoggedIn",
            payload: true,
        };
        expect(loginReducer({}, action)).toEqual({
            isLoggedIn: true,
        });
    });

    it("setField", () => {
        const action = {
            type: "login/setField",
            payload: {
                name: "email",
                value: "test@test.com",
            },
        };
        expect(loginReducer({}, action)).toEqual({
            email: "test@test.com",
        });
        const action2 = {
            type: "login/setField",
            payload: {
                name: "password",
                value: "123456",
            }
        }
        expect(loginReducer({}, action2)).toEqual({
            password: "123456",
        });
    });

    it("setError", () => {
        const action = {
            type: "login/setError",
            payload: "Error",
        };
        expect(loginReducer({}, action)).toEqual({
            error: "Error",
        });
    });

    it("setLoading", () => {
        const action = {
            type: "login/setLoading",
            payload: true,
        };
        expect(loginReducer({}, action)).toEqual({
            isLoading: true,
        });
    });

    it("setPasswordVisible", () => {
        const action = {
            type: "login/setPasswordVisible",
            payload: true,
        };
        expect(loginReducer({}, action)).toEqual({
            passwordVisible: true,
        });
    });

    it("setLoggedIn", () => {
        const action = {
            type: "login/setLoggedIn",
            payload: true,
        };
        expect(loginReducer({}, action)).toEqual({
            isLoggedIn: true,
        });
    });

    it("login/pending", () => {
        expect(loginReducer({}, login.pending)).toEqual({
            isLoading: true,
            error: null,
        });
    });

    it("login/fulfilled", () => {
        expect(loginReducer({}, login.fulfilled({
            success: true,
            accessToken: 'Bearer 123',
            refreshToken: "Bearer 321"
        }))).toEqual({
            isLoggedIn: true,
            isLoading: false,
            error: null,
        });
    });

    // login/login/rejected
    it("login/rejected", () => {
        expect(loginReducer({}, login.rejected)).toEqual({
            error: null,
            isLoading: false,
        });
    });

});