import * as t from './types';

export const createProperty = (property : t.IProperty) : t.ActionTypes => {
    return {
        type: t.CREATE_PROPERTY,
        payload: property
    }
}

export const createPropertySuccess = (property : t.IPropertyDb) : t.ActionTypes => {
    return {
        type: t.CREATE_PROPERTY_SUCCESS,
        payload: property
    }
}

export const createPropertyFail = (error : t.IAppError) : t.ActionTypes => {
    return {
        type: t.CREATE_PROPERTY_FAILURE,
        payload: error
    }
}

export const getPropertyRooms = (id : t.IPropertyDb["id"]) : t.ActionTypes => {
    return {
        type: t.GET_PROPERTY_ROOMS,
        payload: id
    }
}

export const getPropertyRoomsSuccess = (rooms : t.IPropertyRoom[]) : t.ActionTypes => {
    return {
        type: t.GET_PROPERTY_ROOMS_SUCCESS,
        payload: rooms
    }
}

export const getPropertyRoomsFail = (error: t.IAppError) : t.ActionTypes => {
    return {
        type: t.GET_PROPERTY_ROOMS_FAILURE,
        payload: error
    }
}

// export const authSessionSuccess = (loggedInUser: t.ILoggedInUser) : t.ActionTypes => {
//     return {
//         type: t.AUTH_SESSION_SUCCESS,
//         payload: loggedInUser
//     }
// }

// export const authSessionFail = () : t.ActionTypes => {
//     return {
//         type: t.AUTH_SESSION_FAILURE
//     }
// }

// export const login = (creds:t.ICredentials) : t.ActionTypes => {
//     return {
//         type: t.LOGIN_SESSION,
//         payload: creds
//     }
// }

// export const loginSuccess = () : t.ActionTypes => {
//     return {
//         type: t.LOGIN_SESSION_SUCCESS
//     }
// }

// export const loginFailure = () : t.ActionTypes => {
//     return {
//         type: t.LOGIN_SESSION_FAILURE
//     }
// }

// export const logout = () : t.ActionTypes => {
//     return {
//         type: t.LOGOUT_SESSION
//     }
// }

export default {
    createProperty,
    createPropertySuccess,
    createPropertyFail,
    getPropertyRooms,
    getPropertyRoomsSuccess,
    getPropertyRoomsFail
    // authSession,
    // authSessionSuccess,
    // authSessionFail,
    // login,
    // loginSuccess,
    // loginFailure,
    // logout
}