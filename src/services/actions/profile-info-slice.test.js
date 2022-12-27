import profileReducer, {
    initialState,
    revertChangesInForm,
    setEmail,
    setEmailDisabled,
    setName,
    setNameDisabled,
    setPassword,
    setPasswordDisabled
} from "./profile-info-slice";

describe("profileInfoSlice", () => {
    it("initial state", () => {
        const state = profileReducer(undefined, {});
        expect(state).toEqual(initialState);
    });

    // setName
    it("setName", () => {
        expect(profileReducer({form: {}}, setName("test"))).toEqual({
            form: {
                name: "test",
            }
        });
    });

    // setNameDisabled
    it("setNameDisabled", () => {
        expect(profileReducer({disabled: {}}, setNameDisabled(true))).toEqual({
            disabled: {
                name_disabled: true,
            }
        });
    });

    // setEmail
    it("setEmail", () => {
        expect(profileReducer({form: {}}, setEmail("test@test.com"))).toEqual({
            form: {
                email: "test@test.com",
            }
        });
    });

    // setEmailDisabled
    it("setEmailDisabled", () => {
        expect(profileReducer({disabled: {}}, setEmailDisabled(true))).toEqual({
            disabled: {
                email_disabled: true,
            }
        });
    });

    // setPassword
    it("setPassword", () => {
        expect(profileReducer({form: {}}, setPassword("test"))).toEqual({
            form: {
                password: "test",
            }
        });
    });

    // setPasswordDisabled
    it("setPasswordDisabled", () => {
        expect(profileReducer({disabled: {}}, setPasswordDisabled(true))).toEqual({
            disabled: {
                password_disabled: true,
            }
        });
    });

    // revertChangesInForm
    it("revertChangesInForm", () => {
        expect(profileReducer({
            form: {},
            disabled: {},
            user: {name: 'aaa bbb', email: "1@2.com"}
        }, revertChangesInForm)).toEqual({
            user: {
                name: 'aaa bbb',
                email: "1@2.com",
            },
            form: {
                name: "aaa bbb",
                email: "1@2.com",
            },
            disabled: {
                name_disabled: true,
                email_disabled: true,
                password_disabled: true,
            }
        });
    });

    // loadProfile.pending
    it("loadProfile.pending", () => {
        expect(profileReducer({}, {
            type: "profile/loadProfile/pending"
        })).toEqual({
            isLoading: true,
            error: false
        });
    });

    // loadProfile.fulfilled
    it("loadProfile.fulfilled", () => {
        expect(profileReducer({
            form: {},
            disabled: {},
            user: {}
        }, {
            type: "profile/loadProfile/fulfilled",
            payload: {
                user: {
                    name: "aaa bbb",
                    email: "test@user.com",
                }
            }
        })).toEqual({
            isLoading: false,
            error: false,
            form: {
                name: "aaa bbb",
                email: "test@user.com",
            },
            user: {
                name: "aaa bbb",
                email: "test@user.com",
            },
            disabled: {
                name_disabled: true,
                email_disabled: true,
                password_disabled: true,
            }
        });
    });

    // loadProfile.rejected
    it("loadProfile.rejected", () => {
        expect(profileReducer({}, {
            type: "profile/loadProfile/rejected"
        })).toEqual({
            isLoading: false,
            error: true
        });
    });

    // updateProfile.pending
    it("updateProfile.pending", () => {
        expect(profileReducer({}, {
            type: "profile/update/pending"
        })).toEqual({
            isLoading: true,
            error: false
        });
    });

    // updateProfile.fulfilled
    it("updateProfile.fulfilled", () => {
        expect(profileReducer({
            form: {},
            disabled: {},
            user: {}
        }, {
            type: "profile/update/fulfilled",
            payload: {
                user: {
                    name: "aaa bbb",
                    email: "1@2.com",
                }
            }
        })).toEqual({
            isLoading: false,
            error: false,
            form: {
                name: "aaa bbb",
                email: "1@2.com",
            },
            user: {
                name: "aaa bbb",
                email: "1@2.com",
            },
            disabled: {
                name_disabled: true,
                email_disabled: true,
                password_disabled: true,
            }
        });
    });

    // updateProfile.rejected
    it("updateProfile.rejected", () => {
        expect(profileReducer({}, {
            type: "profile/update/rejected"
        })).toEqual({
            isLoading: false,
            error: true
        });
    });

});