import * as t from './types';

const initialState : t.IAppState = {
    loggedInUser: null
}

export default (state = initialState, action: t.ActionTypes) => {
    switch(action.type) {
        case t.AUTH_SESSION_SUCCESS:
            state.loggedInUser = action.payload;
            break;
        case t.LOGOUT_SESSION:
            state.loggedInUser = null;
            break;
        default:
            return state;
    }
    return state;
}