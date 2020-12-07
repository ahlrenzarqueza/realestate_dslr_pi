import { put, takeEvery, fork, call, take } from 'redux-saga/effects';
import { instance } from '../utils/api';
import * as t from './types';
import * as actions from './actions';

function* helloSaga() {
    console.log('Hello Sagas!')
}

function* authenticate ({email, password, isJWT}: t.ICredentials) {
    try{
        if(isJWT) {
            const { data: userdata } = yield call(instance.post, '/user/getuser');
            yield put(actions.authSessionSuccess(userdata));
        }
        else {
            const {  data: userdata } = yield call(instance.post, '/user/login', {email, password});
            yield put(actions.loginSuccess(userdata));
        }
    }
    catch(e) {
        yield put(actions.loginFailure());
    }
}

function* authenticationCycle () {
    while(true) {
        const creds = yield take([t.LOGIN_SESSION, t.AUTH_SESSION]);
        yield fork(authenticate, creds.payload);
        yield take([t.LOGOUT_SESSION, t.LOGIN_SESSION_FAILURE]);
        yield call(instance.post, '/user/logout');
        yield put(actions.logout());
    }
}

export default function* rootSaga() {
    yield fork(authenticationCycle)
}