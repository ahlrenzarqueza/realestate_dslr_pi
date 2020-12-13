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

export const getProperties = () : t.ActionTypes => {
    return {
        type: t.GET_PROPERTIES,
    }
}

export const getPropertiesSuccess = (properties: t.IProperty[]) : t.ActionTypes => {
    return {
        type: t.GET_PROPERTIES_SUCCESS,
        payload: properties
    }
}

export const getPropertiesFail = (error: t.IAppError) : t.ActionTypes => {
    return {
        type: t.GET_PROPERTIES_FAILURE,
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

export const setActiveProperty = (property: t.IPropertyDb | null) : t.ActionTypes => {
    return {
        type: t.SET_ACTIVE_PROPERTY,
        payload: property
    }
}

export const triggerCapture = (scene: 'indoor' | 'outdoor') : t.ActionTypes => {
    return {
        type: t.TRIGGER_CAPTURE,
        payload: scene
    }
}

export const triggerCaptureSuccess = (imagesrc: string) : t.ActionTypes => {
    return {
        type: t.TRIGGER_CAPTURE_SUCCESS,
        payload: imagesrc,
    }
}

export const triggerCaptureFailure = (error: t.IAppError) : t.ActionTypes => {
    return {
        type: t.TRIGGER_CAPTURE_FAILURE,
        payload: error,
    }
}

export const createPropertyRoom = (room: t.INewPropertyRoom) : t.ActionTypes => {
    return {
        type: t.CREATE_PROPERTY_ROOM,
        payload: room
    }
}
export const createPropertyRoomSuccess = () : t.ActionTypes => {
    return {
        type: t.CREATE_PROPERTY_ROOM_SUCCESS,
    }
}

export const createPropertyRoomFail = (error: t.IAppError) : t.ActionTypes => {
    return {
        type: t.CREATE_PROPERTY_ROOM_FAILURE,
        payload: error,
    }
}

export const deleteProperty = (id: number) : t.ActionTypes => {
    return {
        type: t.DELETE_PROPERTY,
        payload: id,
    }
}

export const deletePropertySuccess = (id: number) : t.ActionTypes => {
    return {
        type: t.DELETE_PROPERTY_SUCCESS,
        payload: id,
    }
}

export const deletePropertyFail = (error: t.IAppError) : t.ActionTypes => {
    return {
        type: t.DELETE_PROPERTY_FAILURE,
        payload: error
    }
}

export const deletePropertyRoom = (id: number) : t.ActionTypes => {
    return {
        type: t.DELETE_PROPERTY_ROOM,
        payload: id,
    }
}

export const deletePropertyRoomSuccess = (id: number) : t.ActionTypes => {
    return {
        type: t.DELETE_PROPERTY_ROOM_SUCCESS,
        payload: id,
    }
}

export const deletePropertyRoomFail = (error: t.IAppError) : t.ActionTypes => {
    return {
        type: t.DELETE_PROPERTY_ROOM_FAILURE,
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
    getProperties,
    getPropertiesSuccess,
    getPropertiesFail,
    getPropertyRooms,
    getPropertyRoomsSuccess,
    getPropertyRoomsFail,
    setActiveProperty,
    triggerCapture,
    triggerCaptureSuccess,
    triggerCaptureFailure,
    createPropertyRoom,
    createPropertyRoomSuccess,
    createPropertyRoomFail,
    deleteProperty,
    deletePropertySuccess,
    deletePropertyFail,
    deletePropertyRoom,
    deletePropertyRoomSuccess,
    deletePropertyRoomFail,
    // authSession,
    // authSessionSuccess,
    // authSessionFail,
    // login,
    // loginSuccess,
    // loginFailure,
    // logout
}