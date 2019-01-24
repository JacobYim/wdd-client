import { call, put, takeEvery } from 'redux-saga/effects';

import { setToken, removeToken } from 'src/services/api/axios';
import { loadToken } from 'src/services/storage/token';
import * as actions from 'src/store/actions/user';
import * as api from 'src/services/api/user';

function* autoSignIn(action: ReturnType<typeof actions.autoSignIn>) {
  try {
    yield put(actions.setUserRequest());
    // *** GET TOKEN FROM STORAGE
    const token = yield call(loadToken);
    yield call(setToken, token);
    // *** GET DATA FROM API
    const data = yield call(api.loadUser);
    yield put(actions.setUserSuccess(data));
    yield call(action.navigate.success);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
    yield call(removeToken);
    yield call(action.navigate.failure);
  }
}

function* signIn(action: ReturnType<typeof actions.signIn>) {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.signIn, action.payload);
    yield put(actions.setUserSuccess(data));
    yield call(action.navigate);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* signUp(action: ReturnType<typeof actions.signUp>) {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.signUp, action.payload);
    yield put(actions.setUserSuccess(data));
    yield call(action.navigate);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* signOut() {
  yield put(actions.removeUser());
}

export default function* root() {
  yield takeEvery(actions.AUTO_SIGNIN, autoSignIn);
  yield takeEvery(actions.SIGNIN, signIn);
  yield takeEvery(actions.SIGNUP, signUp);
  yield takeEvery(actions.SIGNOUT, signOut);
}
