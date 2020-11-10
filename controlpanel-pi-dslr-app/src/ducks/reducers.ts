import * as t from './types';

const initialState : t.IAppState = {
    loggedInUser: undefined
}

export default (state = initialState, action: t.ActionTypes) => {
    switch(action.type) {
        case t.AUTH_SESSION_SUCCESS:
            state.loggedInUser = action.payload;
            break;
        case t.LOGOUT_SESSION:
            delete state.loggedInUser;
            break;
        default:
            return state;
    }
    return state;
}