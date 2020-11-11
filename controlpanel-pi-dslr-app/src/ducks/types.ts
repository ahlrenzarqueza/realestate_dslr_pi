export interface ILoggedInUser {
    id: string,
    name: string
}

export interface IAppState {
    loggedInUser: ILoggedInUser | null
}

export interface IJWTCredentials {
    isJWT: boolean
}

export interface ILoginCredentials {
    email?: string,
    password?: string
}

export interface ICredentials extends IJWTCredentials, ILoginCredentials {}

export const AUTH_SESSION = 'AUTH_SESSION';
export const AUTH_SESSION_SUCCESS = 'AUTH_SESSION_SUCCESS';
export const AUTH_SESSION_FAILURE = 'AUTH_SESSION_FAILURE';
export const LOGIN_SESSION = 'LOGIN_SESSION';
export const LOGIN_SESSION_SUCCESS = 'LOGIN_SESSION_SUCCESS';
export const LOGIN_SESSION_FAILURE = 'LOGIN_SESSION_FAILURE';
export const LOGOUT_SESSION = 'LOGOUT_SESSION';

export interface AuthenticateAction {
    type: typeof AUTH_SESSION,
    payload: IJWTCredentials
}

export interface AuthenticateSuccessAction {
    type: typeof AUTH_SESSION_SUCCESS,
    payload: ILoggedInUser
}

export interface AuthenticateFailureAction {
    type: typeof AUTH_SESSION_FAILURE
}

export interface LoginAction {
    type: typeof LOGIN_SESSION,
    payload: ILoginCredentials
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SESSION_SUCCESS
}

export interface LoginFailureAction {
    type: typeof LOGIN_SESSION_FAILURE
}

export interface LogoutAction {
    type: typeof LOGOUT_SESSION
}

export type ActionTypes = 
AuthenticateAction
| AuthenticateSuccessAction
| AuthenticateFailureAction
| LoginAction
| LoginSuccessAction
| LoginFailureAction
| LogoutAction