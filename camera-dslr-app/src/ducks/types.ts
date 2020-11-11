export interface IProperty {
    address: string,
    agent: string,
    numBedroom: number,
    numBathroom: number
}

export interface IPropertyDb extends IProperty {
    id: number
}

export interface IPropertyRoom {
    scene: 'indoor' | 'outdoor',
    name: string
}

export interface IAppState {
    activeProperty: IPropertyDb | null,
    propertyList: IPropertyDb[],
    roomList: IPropertyRoom[],
    isLoadingState: {
        properties: boolean,
        propertyRooms: boolean
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
export const GET_PROPERTY_ROOMS = 'GET_PROPERTY_ROOMS';
export const GET_PROPERTY_ROOMS_SUCCESS = 'GET_PROPERTY_ROOMS_SUCCESS';
export const GET_PROPERTY_ROOMS_FAILURE = 'GET_PROPERTY_ROOMS_FAILURE';
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

export type ActionTypes = 
CreatePropertyAction |
CreatePropertySuccessAction |
CreatePropertyFailureAction |
GetPropertyRoomsAction |
GetPropertyRoomsSuccessAction |
GetPropertyRoomsFailureAction
// | AuthenticateSuccessAction
// | AuthenticateFailureAction
// | LoginAction
// | LoginSuccessAction
// | LoginFailureAction
// | LogoutAction