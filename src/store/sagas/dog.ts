import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from 'src/services/api/dog';
import { removeNextStep } from 'src/services/storage/user';
import * as actions from 'src/store/actions/dog';
import { navigateToApp } from './user';

function* selectDog(action: ReturnType<typeof actions.selectDog>) {
  try {
    yield put(actions.setDogRequest());
    const data = yield call(api.selectDog, action.payload);
    yield put(actions.setDogSuccess(data));
    yield call(removeNextStep);
  } catch (e) {
    yield put(actions.setDogFailure(e.response));
  }
}

function* createDog(action: ReturnType<typeof actions.createDog>) {
  try {
    yield put(actions.setDogRequest());
    const data = yield call(api.createDog, action.payload);
    yield put(actions.setDogSuccess(data));
    yield call(removeNextStep);
    // *** NAVIGATE
    if (action.navigation) yield call(navigateToApp, action.navigation);
  } catch (e) {
    yield put(actions.setDogFailure(e.response));
  }
}

function* updateDog(action: ReturnType<typeof actions.updateDog>) {
  // call only dog is represent position
  try {
    yield put(actions.setDogRequest());
    const data = yield call(api.updateDog, action.payload);
    yield put(actions.setDogSuccess(data));
    yield call(removeNextStep);
  } catch (e) {
    yield put(actions.setDogFailure(e.response));
  }
}

export default function* root() {
  yield takeEvery(actions.SELECT_DOG, selectDog);
  yield takeEvery(actions.CREATE_DOG, createDog);
  yield takeEvery(actions.UPDATE_DOG, updateDog);
}
