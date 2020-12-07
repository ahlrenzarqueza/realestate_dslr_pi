import * as t from './types';

const initialState : t.IAppState = {
    loggedInUser: null,
    authError: false
}

export default (state = initialState, action: t.ActionTypes) => {
    switch(action.type) {
        case t.AUTH_SESSION_SUCCESS:
            return {
                ...state,
                loggedInUser: action.payload,
                authError: false
            }
        case t.LOGIN_SESSION_SUCCESS:
            return {
                ...state,
                loggedInUser: action.payload,
                authError: false
            }
        case t.LOGIN_SESSION_FAILURE:
            return {
                ...state,
                authError: true
            }
        case t.LOGOUT_SESSION:
            return {
                ...state,
                loggedInUser: null,
                authError: false
            }
            break;
        default:
            return state;
    }
    return state;
}