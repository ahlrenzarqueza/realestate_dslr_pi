import { put, takeEvery, takeLatest, all, take, call, select } from 'redux-saga/effects';
import { instance } from '../utils/api';
import * as t from './types';
import * as actions from './actions';
import { displayPartsToString } from 'typescript';
import { getErrorReturn } from '../utils/helper';


function* helloSaga() {
    console.log('Hello Sagas!')
}  

function* getProperties() {
  try {
    const { data } = yield call(instance.get, '/homeproperties');
    yield put(actions.getPropertiesSuccess(data.data));
  }
  catch(e) {
    yield put(actions.getPropertiesFail(getErrorReturn(500, e)));
  }
}

function* getPropertyRooms(action: t.GetPropertyRoomsAction) {
  try {
    const { data } = yield call(instance.get, `/homeproperties/${action.payload}`);
    yield put(actions.getPropertyRoomsSuccess(data.data));
  }
  catch(e) {
    yield put(actions.getPropertyRoomsFail(getErrorReturn(500, e)));
  }
}

function* createProperty(action : t.CreatePropertyAction) {
  try {
    const { data } = yield call(instance.post, '/homeproperties', action.payload);
    yield put(actions.createPropertySuccess(data.data));
  }
  catch(e) {
    yield put(actions.createPropertyFail(getErrorReturn(500, e)));
  }
}

function* triggerCapture(action : t.TriggerCapture) {
  try {
    const { data } = yield call(instance.get, `/camera/${action.payload}`);
    yield put(actions.triggerCaptureSuccess(data));
  }
  catch(e) {
    yield put(actions.triggerCaptureFailure(getErrorReturn(500, e)));
  }
}

function* createRoom(action : t.CreatePropertyRoom) {
  try {
    const getPropertyId = (state: t.IAppState) => (state.activeProperty ? state.activeProperty.id : '');
    const propertyId = yield select(getPropertyId);
    const requestData = {
      ...action.payload,
      propertyId
    }
    yield call(instance.post, `/homeproperties/${propertyId}`, requestData);
    yield put(actions.createPropertyRoomSuccess());
  }
  catch(e) {
    yield put(actions.createPropertyRoomFail(getErrorReturn(500, e)));
  }
}

function* deleteProperty(action: t.DeleteProperty) {
  try {
    yield call(instance.delete, `/homeproperties/delete/${action.payload}`);
    yield put(actions.deletePropertySuccess(action.payload));
  }
  catch(e) {
    yield put(actions.deletePropertyFail(getErrorReturn(500, e)));
  }
}

function* deletePropertyRoom(action: t.DeletePropertyRoom) {
  try {
    const getPropertyId = (state: t.IAppState) => (state.activeProperty ? state.activeProperty.id : '');
    const propertyId = yield select(getPropertyId);
    yield call(instance.delete, `/homeproperties/delete/${propertyId}/${action.payload}`);
    yield put(actions.deletePropertyRoomSuccess(action.payload));
  }
  catch(e) {
    yield put(actions.deletePropertyRoomFail(getErrorReturn(500, e)));
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
    yield takeLatest(t.CREATE_PROPERTY_ROOM, createRoom);
    yield takeLatest(t.DELETE_PROPERTY, deleteProperty);
    yield takeLatest(t.DELETE_PROPERTY_ROOM, deletePropertyRoom);
  }