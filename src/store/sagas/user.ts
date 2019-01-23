import { call, put, takeEvery } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import * as actions from 'src/store/actions/user';
import * as api from 'src/services/api/user';

export function* loadUser() {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.loadUser);
    yield put(actions.setUserSuccess(data));
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

export function* signIn(action: ReturnType<typeof actions.signIn>) {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.signIn, action.payload);
    yield put(actions.setUserSuccess(data));
    yield put(NavigationActions.navigate({ routeName: 'app' }));
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

export function* signUp(action: ReturnType<typeof actions.signUp>) {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.signUp, action.payload);
    yield put(actions.setUserSuccess(data));
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

export function* signOut() {
  try {
    yield put(actions.removeUserSuccess());
  } catch (e) {
    yield put(actions.removeUserFailure(e));
  }
}

export default function* root() {
  yield takeEvery(actions.LOAD_USER, loadUser);
  yield takeEvery(actions.SIGNIN, signIn);
  yield takeEvery(actions.SIGNUP, signUp);
  yield takeEvery(actions.SIGNOUT, signOut);
}
