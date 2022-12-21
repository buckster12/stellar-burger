import resetPasswordReducer, {
    clearData,
    resetPassword,
    setEmail,
    setEmailToken,
    setNewPassword, setNewPasswordRequest
} from "./reset-password-slice";

describe("resetPasswordSlice", () => {
    // initial
    it("should return the initial state", () => {
        expect(resetPasswordReducer(undefined, {})).toEqual({
            email: '',
            error: false,
            newPassword: '',
            emailToken: '',
            successPasswordChanged: false,
            isLoading: false,
            errorMessage: '',
        });
    });

    // setEmail
    it("should set email", () => {
        const email = "test@example.com";
        expect(resetPasswordReducer({}, setEmail(email))).toEqual({
            email: email,
            error: false,
        });
        expect(resetPasswordReducer({}, setEmail("test@"))).toEqual({
            email: "test@",
            error: true,
        });
    });

    // setNewPassword
    it("should set new password", () => {
        expect(resetPasswordReducer({}, setNewPassword("123456"))).toEqual({
            newPassword: "123456",
        });
    });

    // setEmailToken
    it("should set email token", () => {
        expect(resetPasswordReducer({}, setEmailToken("token"))).toEqual({
            emailToken: "token",
        });
    });

    // clearData
    it("should clear data", () => {
        expect(resetPasswordReducer({
            email: 'test@test.com',
            error: true,
            newPassword: '123456',
            emailToken: 'token'
        }, clearData())).toEqual({
            email: '',
            error: false,
            newPassword: '',
            emailToken: '',
            successPasswordChanged: false,
            isLoading: false,
            errorMessage: '',
        });
    });

    // resetPassword.pending
    it("should set isLoading to true", () => {
        expect(resetPasswordReducer({}, resetPassword.pending)).toEqual({
            error: false,
            isLoading: true,
        });
    });

    // resetPassword.fulfilled
    it("should set successPasswordChanged to true", () => {
        // ok
        expect(resetPasswordReducer({}, resetPassword.fulfilled({
            success: true,
        }))).toEqual({
            isLoading: false,
        });
        // error
        expect(resetPasswordReducer({}, resetPassword.fulfilled({
            success: false,
            message: 'Something went wrong'
        }))).toEqual({
            isLoading: false,
            errorMessage: 'Something went wrong',
        });
    });

    // resetPassword.rejected
    it("should set error to true", () => {
        expect(resetPasswordReducer({}, resetPassword.rejected)).toEqual({
            error: true,
            isLoading: false,
        });
    });

    // setNewPasswordRequest.pending
    it("setNewPasswordRequest - pending", () => {
        expect(resetPasswordReducer({}, setNewPasswordRequest.pending)).toEqual({
            isLoading: true,
        });
    });

    // setNewPasswordRequest.fulfilled
    it("setNewPasswordRequest - fulfilled", () => {
        // ok
        expect(resetPasswordReducer({}, setNewPasswordRequest.fulfilled({
            success: true,
        }))).toEqual({
            isLoading: false,
            successPasswordChanged: true,
        });
        // error
        expect(resetPasswordReducer({}, setNewPasswordRequest.fulfilled({
            success: false,
            message: 'Something went wrong'
        }))).toEqual({
            isLoading: false,
            errorMessage: 'Something went wrong',
        });
    });

    // setNewPasswordRequest.rejected
    it("setNewPasswordRequest - rejected", () => {
        expect(resetPasswordReducer({}, setNewPasswordRequest.rejected({message: 'error message'}))).toEqual({
            error: true,
            isLoading: false,
            errorMessage: 'error message',
        });
    });
});
