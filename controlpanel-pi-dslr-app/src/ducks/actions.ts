import * as t from './types';

export const authSession = () : t.ActionTypes => {
    return {
        type: t.AUTH_SESSION,
        payload: {
            isJWT: true
        }
    }
}

export const authSessionSuccess = (loggedInUser: t.ILoggedInUser) : t.ActionTypes => {
    return {
        type: t.AUTH_SESSION_SUCCESS,
        payload: loggedInUser
    }
}

export const authSessionFail = () : t.ActionTypes => {
    return {
        type: t.AUTH_SESSION_FAILURE
    }
}

export const login = (creds:t.ILoginCredentials) : t.ActionTypes => {
    return {
        type: t.LOGIN_SESSION,
        payload: creds
    }
}

export const loginSuccess = (loggedInUser: t.ILoggedInUser) : t.ActionTypes => {
    return {
        type: t.LOGIN_SESSION_SUCCESS,
        payload: loggedInUser
    }
}

export const loginFailure = () : t.ActionTypes => {
    return {
        type: t.LOGIN_SESSION_FAILURE
    }
}

export const logout = () : t.ActionTypes => {
    return {
        type: t.LOGOUT_SESSION
    }
}

export const logoutSuccess = () : t.ActionTypes => {
    return {
        type: t.LOGOUT_SESSION_SUCCESS
    }
}

export const logoutFailure = () : t.ActionTypes => {
    return {
        type: t.LOGOUT_SESSION_FAILURE
    }
}

export default {
    authSession,
    authSessionSuccess,
    authSessionFail,
    login,
    loginSuccess,
    loginFailure,
    logout,
    logoutSuccess,
    logoutFailure
}