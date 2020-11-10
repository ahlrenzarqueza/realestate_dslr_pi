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

export const login = (creds:t.ICredentials) : t.ActionTypes => {
    return {
        type: t.LOGIN_SESSION,
        payload: creds
    }
}

export const loginSuccess = () : t.ActionTypes => {
    return {
        type: t.LOGIN_SESSION_SUCCESS
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

export default {
    authSession,
    authSessionSuccess,
    authSessionFail,
    login,
    loginSuccess,
    loginFailure,
    logout
}