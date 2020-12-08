export interface IProperty {
    address: string,
    agentName: string,
    numOfBedrooms: number,
    numOfBathrooms: number
}

export interface IPropertyDb extends IProperty {
    id: number
}

export interface IPropertyRoom {
    mode: 'indoor' | 'outdoor',
    name: string,
    propertyId?: number,
    roomId?: number,
    mediapath: string
}

export interface IAppState {
    activeProperty: IPropertyDb | null,
    activeBlendedImage: string | null,
    propertyList: IPropertyDb[],
    roomList: IPropertyRoom[],
    isLoadingState: {
        addProperty: boolean,
        properties: boolean,
        propertyRooms: boolean,
        camera: boolean,
        addRoom: boolean,
    },
    errorState: IAppError | null
}

export interface IAppError {
    code: number,
    message: string
}

// export interface IJWTCredentials {
//     isJWT: boolean
// }

// export interface ICredentials extends IJWTCredentials {
//     email?: string,
//     password?: string
// }

export const CREATE_PROPERTY = 'CREATE_PROPERTY';
export const CREATE_PROPERTY_SUCCESS = 'CREATE_PROPERTY_SUCCESS';
export const CREATE_PROPERTY_FAILURE = 'CREATE_PROPERTY_FAILURE';
export const GET_PROPERTIES = 'GET_PROPERTIES';
export const GET_PROPERTIES_SUCCESS = 'GET_PROPERTIES_SUCCESS';
export const GET_PROPERTIES_FAILURE = 'GET_PROPERTIES_FAILURE';
export const GET_PROPERTY_ROOMS = 'GET_PROPERTY_ROOMS';
export const GET_PROPERTY_ROOMS_SUCCESS = 'GET_PROPERTY_ROOMS_SUCCESS';
export const GET_PROPERTY_ROOMS_FAILURE = 'GET_PROPERTY_ROOMS_FAILURE';
export const SET_ACTIVE_PROPERTY = 'SET_ACTIVE_PROPERTY';
export const TRIGGER_CAPTURE = 'TRIGGER_CAPTURE';
export const TRIGGER_CAPTURE_SUCCESS = 'TRIGGER_CAPTURE_SUCCESS';
export const TRIGGER_CAPTURE_FAILURE = 'TRIGGER_CAPTURE_FAILURE';
export const CREATE_PROPERTY_ROOM = 'CREATE_PROPERTY_ROOM';
export const CREATE_PROPERTY_ROOM_SUCCESS = 'CREATE_PROPERTY_ROOM_SUCCESS';
export const CREATE_PROPERTY_ROOM_FAILURE = 'CREATE_PROPERTY_ROOM_FAILURE';
// export const AUTH_SESSION = 'AUTH_SESSION';
// export const AUTH_SESSION_SUCCESS = 'AUTH_SESSION_SUCCESS';
// export const AUTH_SESSION_FAILURE = 'AUTH_SESSION_FAILURE';
// export const LOGIN_SESSION = 'LOGIN_SESSION';
// export const LOGIN_SESSION_SUCCESS = 'LOGIN_SESSION_SUCCESS';
// export const LOGIN_SESSION_FAILURE = 'LOGIN_SESSION_FAILURE';
// export const LOGOUT_SESSION = 'LOGOUT_SESSION';

// export interface AuthenticateAction {
//     type: typeof AUTH_SESSION,
//     payload: IJWTCredentials
// }

// export interface AuthenticateSuccessAction {
//     type: typeof AUTH_SESSION_SUCCESS,
//     payload: ILoggedInUser
// }

// export interface AuthenticateFailureAction {
//     type: typeof AUTH_SESSION_FAILURE
// }

// export interface LoginAction {
//     type: typeof LOGIN_SESSION,
//     payload: ICredentials
// }

// export interface LoginSuccessAction {
//     type: typeof LOGIN_SESSION_SUCCESS
// }

// export interface LoginFailureAction {
//     type: typeof LOGIN_SESSION_FAILURE
// }

// export interface LogoutAction {
//     type: typeof LOGOUT_SESSION
// }

export interface CreatePropertyAction {
    type: typeof CREATE_PROPERTY
    payload: IProperty
}

export interface CreatePropertySuccessAction {
    type: typeof CREATE_PROPERTY_SUCCESS,
    payload: IPropertyDb
}

export interface CreatePropertyFailureAction {
    type: typeof CREATE_PROPERTY_FAILURE,
    payload: IAppError
}

export interface GetPropertiesAction {
    type: typeof GET_PROPERTIES,
}

export interface GetPropertiesSuccessAction {
    type: typeof GET_PROPERTIES_SUCCESS,
    payload: IProperty[]
}

export interface GetPropertiesFailureAction {
    type: typeof GET_PROPERTIES_FAILURE,
    payload: IAppError
}

export interface GetPropertyRoomsAction {
    type: typeof GET_PROPERTY_ROOMS,
    payload: number
}

export interface GetPropertyRoomsSuccessAction {
    type: typeof GET_PROPERTY_ROOMS_SUCCESS,
    payload: IPropertyRoom[]
}

export interface GetPropertyRoomsFailureAction {
    type: typeof GET_PROPERTY_ROOMS_FAILURE,
    payload: IAppError
}

export interface SetActiveProperty {
    type: typeof SET_ACTIVE_PROPERTY,
    payload: IPropertyDb
}

export interface TriggerCapture {
    type: typeof TRIGGER_CAPTURE,
    payload: 'indoor' | 'outdoor'
}

export interface TriggerCaptureSuccess {
    type: typeof TRIGGER_CAPTURE_SUCCESS,
    payload: string
}

export interface TriggerCaptureFailure {
    type: typeof TRIGGER_CAPTURE_FAILURE,
    payload: IAppError,
}

export interface CreatePropertyRoom {
    type: typeof CREATE_PROPERTY_ROOM,
    payload: IPropertyRoom
}

export interface CreatePropertyRoomSuccess {
    type: typeof CREATE_PROPERTY_ROOM_SUCCESS,
}

export interface CreatePropertyRoomFail {
    type: typeof CREATE_PROPERTY_ROOM_FAILURE,
    payload: IAppError,
}

export type ActionTypes = 
CreatePropertyAction |
CreatePropertySuccessAction |
CreatePropertyFailureAction |
GetPropertiesAction |
GetPropertiesSuccessAction |
GetPropertiesFailureAction |
GetPropertyRoomsAction |
GetPropertyRoomsSuccessAction |
GetPropertyRoomsFailureAction |
SetActiveProperty |
TriggerCapture |
TriggerCaptureSuccess |
TriggerCaptureFailure |
CreatePropertyRoom |
CreatePropertyRoomSuccess |
CreatePropertyRoomFail
// | AuthenticateSuccessAction
// | AuthenticateFailureAction
// | LoginAction
// | LoginSuccessAction
// | LoginFailureAction
// | LogoutAction