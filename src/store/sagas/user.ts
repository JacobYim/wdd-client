import { call, put, takeEvery } from 'redux-saga/effects';

import { SignInInterface, SignUpInterface } from 'src/store/actions/user';
import * as actions from 'src/store/actions/user';
import * as api from 'src/services/api/user';

export function* loadUser() {
  try {
    const data = yield call(api.loadUser);
    yield put(actions.userSuccess(data));
  } catch (e) {
    yield put(actions.userFailure(e));
  }
}

export function* signIn(params: SignInInterface) {
  try {
    const data = yield call(api.signIn, params);
    yield put(actions.userSuccess(data));
  } catch (e) {
    yield put(actions.userFailure(e));
  }
}

export function* signUp(params: SignUpInterface) {
  try {
    const data = yield call(api.signUp, params);
    yield put(actions.userSuccess(data));
  } catch (e) {
    yield put(actions.userFailure(e));
  }
}

export function* signOut() {
  yield;
}

export default function* root() {
  yield takeEvery(actions.LOAD_USER, loadUser);
  yield takeEvery(actions.SIGNIN, signIn);
  yield takeEvery(actions.SIGNUP, signUp);
  yield takeEvery(actions.SIGNOUT, signOut);
}
