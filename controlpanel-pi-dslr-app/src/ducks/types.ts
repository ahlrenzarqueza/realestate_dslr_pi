export interface ILoggedInUser {
    id: string,
    name: string
}

export interface IAppState {
    loggedInUser: ILoggedInUser | null,
    authError: boolean
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
export const LOGOUT_SESSION_SUCCESS = 'LOGOUT_SESSION_SUCCESS';
export const LOGOUT_SESSION_FAILURE = 'LOGOUT_SESSION_FAILURE';

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
    type: typeof LOGIN_SESSION_SUCCESS,
    payload: ILoggedInUser
}

export interface LoginFailureAction {
    type: typeof LOGIN_SESSION_FAILURE
}

export interface LogoutAction {
    type: typeof LOGOUT_SESSION
}

export interface LogoutSuccessAction {
    type: typeof LOGOUT_SESSION_SUCCESS
}

export interface LogoutFailureAction {
    type: typeof LOGOUT_SESSION_FAILURE
}

export type ActionTypes = 
AuthenticateAction
| AuthenticateSuccessAction
| AuthenticateFailureAction
| LoginAction
| LoginSuccessAction
| LoginFailureAction
| LogoutAction
| LogoutSuccessAction
| LogoutFailureAction