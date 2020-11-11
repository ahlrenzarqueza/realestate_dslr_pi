import { put, takeEvery, all } from 'redux-saga/effects';
import { instance } from '../utils/api';
import * as t from './types';
import * as actions from './actions';


function* helloSaga() {
    console.log('Hello Sagas!')
}  

export default function* rootSaga() {
    yield all([
      helloSaga()
    ])
  }