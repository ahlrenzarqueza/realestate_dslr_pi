import { put, takeEvery, takeLatest, all, take, call } from 'redux-saga/effects';
import { instance } from '../utils/api';
import * as t from './types';
import * as actions from './actions';


function* helloSaga() {
    console.log('Hello Sagas!')
}  

function* getProperties() {
  try {
    const { data } = yield call(instance.get, '/homeproperties');
    yield put(actions.getPropertiesSuccess(data.data));
  }
  catch(e) {
    yield put(actions.getPropertiesFail(e));
  }
}

function* getPropertyRooms(action: t.GetPropertyRoomsAction) {
  try {
    const { data } = yield call(instance.get, `/homeproperties/${action.payload}`);
    yield put(actions.getPropertyRoomsSuccess(data.data));
  }
  catch(e) {
    yield put(actions.getPropertyRoomsSuccess(e));
  }
}

function* createProperty(action : t.CreatePropertyAction) {
  try {
    const { data } = yield call(instance.post, '/homeproperties', action.payload);
    yield put(actions.createPropertySuccess(data.data));
  }
  catch(e) {
    yield put(actions.createPropertyFail(e));
  }
}

function* triggerCapture(action : t.TriggerCapture) {
  try {
    const urlString = yield call(instance.get, `/camera/${action.payload}`);
    yield put(actions.triggerCaptureSuccess(urlString));
  }
  catch(e) {
    yield put(actions.triggerCaptureFailure(e));
  }
}



export default function* rootSaga() {
    yield all([
      helloSaga()
    ]);
    yield takeLatest(t.GET_PROPERTIES, getProperties);
    yield takeLatest(t.GET_PROPERTY_ROOMS, getPropertyRooms);
    yield takeLatest(t.CREATE_PROPERTY, createProperty);
    yield takeLatest(t.TRIGGER_CAPTURE, triggerCapture);
  }