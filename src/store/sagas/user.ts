import { call, put, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { setHeader, removeHeader } from 'src/services/api/axios';
import {
  getUserStorage,
  setUserStorage,
  removeUserStorage,
} from 'src/services/storage/user';
import * as actions from 'src/store/actions/user';
import * as api from 'src/services/api/user';

function* autoSignIn(action: ReturnType<typeof actions.autoSignIn>) {
  try {
    yield put(actions.setUserRequest());
    // *** GET TOKEN FROM STORAGE
    const { token, saveExist } = yield call(getUserStorage);
    yield call(setHeader, token);
    // *** GET DATA FROM API
    const data = yield call(api.getUser);
    yield put(actions.setUserSuccess(data));
    // *** NAVIGATE
    if (!saveExist) yield call(action.navigate.success);
    else
      Alert.alert('회원가입이 진행중입니다.', '이어서 하시겠습니까?', [
        {
          text: '예',
          onPress: function*() {
            yield call(action.navigate.pending);
          },
        },
        {
          text: '나중에',
          onPress: function*() {
            yield call(action.navigate.success);
          },
          style: 'cancel',
        },
      ]);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
    yield call(removeHeader);
    // *** NAVIGATE
    yield call(action.navigate.failure);
  }
}

function* signIn(action: ReturnType<typeof actions.signIn>) {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.signIn, action.payload);
    yield put(actions.setUserSuccess(data));
    yield call(setUserStorage, { token: data.token, saveExist: false });
    // *** NAVIGATE
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
    yield call(setUserStorage, { token: data.token, saveExist: true });
    // *** NAVIGATE
    yield call(action.navigate);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* signOut(action: ReturnType<typeof actions.signOut>) {
  yield put(actions.removeUser());
  yield call(removeHeader);
  yield call(removeUserStorage);
  // *** NAVIGATE
  yield call(action.navigate);
}

export default function* root() {
  yield takeEvery(actions.AUTO_SIGNIN, autoSignIn);
  yield takeEvery(actions.SIGNIN, signIn);
  yield takeEvery(actions.SIGNUP, signUp);
  yield takeEvery(actions.SIGNOUT, signOut);
}
