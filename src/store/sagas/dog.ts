import { call, put, takeEvery } from 'redux-saga/effects';

import { removeNextStep } from 'src/services/storage/user';
import * as actions from 'src/store/actions/dog';
import * as api from 'src/services/api/dog';

function* getDog(action: ReturnType<typeof actions.getDog>) {
  try {
    yield put(actions.setDogRequest());
    const data = yield call(api.getDog, action.payload);
    yield put(actions.setDogSuccess(data));
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
    if (action.navigation) yield call(action.navigation.navigate, 'tutorial');
  } catch (e) {
    yield put(actions.setDogFailure(e.response));
  }
}

export default function* root() {
  yield takeEvery(actions.GET_DOG, getDog);
  yield takeEvery(actions.CREATE_DOG, createDog);
}
