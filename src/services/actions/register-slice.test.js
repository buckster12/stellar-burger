import {setRegisterForm, register} from "./register-slice";
import registerReducer from "./register-slice";

describe("registerSlice", () => {
    it("initial state of registerSlice", () => {
        expect(registerReducer(undefined, {})).toEqual({
            name: "",
            email: "",
            password: "",
            error: null,
            isLoading: false,
        });
    });

    // setRegisterForm
    it("set register form", () => {
        const name = "test";
        const email = "test@example.com";
        const password = "123";
        expect(registerReducer({}, setRegisterForm({name: 'name', value: name}))).toEqual({
            name: name,
        });
        expect(registerReducer({}, setRegisterForm({name: 'email', value: email}))).toEqual({
            email: email,
        });
        expect(registerReducer({}, setRegisterForm({name: 'password', value: password}))).toEqual({
            password: password,
        });
    });

    // register.pending
    it("register.pending", () => {
        expect(registerReducer({}, register.pending)).toEqual({
            isLoading: true,
            error: null,
        });
    });

    // register.fulfilled
    it("register.fullfilled", () => {
        expect(registerReducer({}, register.fulfilled)).toEqual({
            isLoading: false,
        });
    });

    // register.rejected
    it("register.rejected", () => {
        expect(registerReducer({}, register.rejected({message: "Error message"}))).toEqual({
            isLoading: false,
            error: "Error message",
        });
    });
});
