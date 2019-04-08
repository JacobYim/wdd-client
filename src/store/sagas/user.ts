import { Alert } from 'react-native';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { removeHeader, setHeader } from 'src/services/api/axios';
import * as api from 'src/services/api/user';
import * as actions from 'src/store/actions/user';
import { ReducerState } from 'src/store/reducers';

import {
  getUserStorage,
  setUserStorage,
  updateUserStorage,
  removeUserStorage,
} from 'src/services/storage/user';

// HELPERS
const getUserFromStore = (state: ReducerState) => state.user;

// SAGAS
function* getUser() {
  try {
    yield put(actions.setUserRequest());
    const data = yield call(api.getUser);
    yield put(actions.setUserSuccess(data));
  } catch (e) {
    yield put(actions.setUserFailure(e));
  }
}

function* autoSignIn(action: ReturnType<typeof actions.autoSignIn>) {
  try {
    // *** GET TOKEN FROM STORAGE
    const { token, nextStep } = yield call(getUserStorage);
    yield call(setHeader, token);
    // *** API
    yield put(actions.setUserRequest());
    const data = yield call(api.getUser);
    yield put(actions.setUserSuccess(data));
    // *** NAVIGATE
    if (!nextStep) {
      yield call(action.navigation.navigate, 'app');
    } else {
      Alert.alert('회원가입이 진행중입니다.', '이어서 하시겠습니까?', [
        {
          text: '예',
          onPress: () => {
            action.navigation.navigate('session');
            action.navigation.navigate('signUp');
            action.navigation.navigate(nextStep);
          },
        },
        {
          text: '나중에',
          onPress: async () => {
            action.navigation.navigate('app');
          },
          style: 'cancel',
        },
      ]);
    }
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
    if (e.response && e.response.data.statusCode === 403) {
      yield call(removeHeader);
      yield call(removeUserStorage);
    }
    // *** NAVIGATE
    yield call(action.navigation.navigate, 'session');
  }
}

function* signIn(action: ReturnType<typeof actions.signIn>) {
  try {
    // *** API
    yield put(actions.setUserRequest());
    const data = yield call(api.signIn, action.payload);
    yield put(actions.setUserSuccess(data));
    // *** SET TOKEN
    const { token } = data;
    yield call(setHeader, token);
    yield call(setUserStorage, { token });
    // *** NAVIGATE
    yield call(action.navigation.navigate, 'app');
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* signUp(action: ReturnType<typeof actions.signUp>) {
  try {
    // *** API
    yield put(actions.setUserRequest());
    const data = yield call(api.signUp, action.payload);
    yield put(actions.setUserSuccess(data));
    // *** SET TOKEN
    const { token } = data;
    yield call(setHeader, token);
    // *** SAVE STEP ON STORAGE
    const nextStep = 'createMeta';
    yield call(setUserStorage, { token, nextStep });
    // *** NAVIGATE
    yield call(action.navigation.navigate, nextStep);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* signOut(action: ReturnType<typeof actions.signOut>) {
  yield put(actions.removeUser());
  yield call(removeHeader);
  yield call(removeUserStorage);
  // *** NAVIGATE
  yield call(action.navigation.navigate, 'session');
}

function* terminate(action: ReturnType<typeof actions.terminate>) {
  function* handlePress() {
    yield put(actions.setUserRequest());
    yield call(api.terminate);
    yield put(actions.removeUser());
    yield call(removeHeader);
    yield call(removeUserStorage);
    // *** NAVIGATE
    yield call(action.navigation.navigate, 'session');
  }

  try {
    Alert.alert('탈퇴 후에는 되돌릴 수 없습니다.', '정말 탈퇴하시겠습니까?', [
      {
        text: '예',
        onPress: handlePress,
      },
      {
        text: '나중에',
        style: 'cancel',
      },
    ]);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* createMeta(action: ReturnType<typeof actions.createMeta>) {
  try {
    // *** API
    yield put(actions.setUserRequest());
    const data = yield call(api.updateUser, action.payload);
    yield put(actions.setUserSuccess(data));
    // *** SAVE STEP ON STORAGE
    const nextStep = 'createDog';
    yield call(updateUserStorage, { nextStep });
    // *** NAVIGATE
    yield call(action.navigation.navigate, nextStep);
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* forgotPassword(action: ReturnType<typeof actions.forgotPassword>) {
  try {
    // *** API
    yield call(api.forgotPassword, action.payload);
    // *** NAVIGATE
    yield call(action.navigation.navigate, 'sendEmail');
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* changePassword(action: ReturnType<typeof actions.changePassword>) {
  try {
    // *** SET TOKEN
    const { token } = action.payload;
    yield call(setHeader, token);
    yield call(setUserStorage, { token });
    // *** API
    yield put(actions.setUserRequest());
    const data = yield call(api.updateUser, action.payload);
    yield put(actions.setUserSuccess(data));
    // *** NAVIGATE
    yield call(action.navigation.navigate, 'app');
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
  }
}

function* updateLocation(action: ReturnType<typeof actions.updateLocation>) {
  const location = {
    type: 'Point',
    coordinates: [action.payload.longitude, action.payload.latitude],
  };
  try {
    yield put(actions.setUserRequest());
    const user: ReturnType<typeof getUserFromStore> = yield select(
      getUserFromStore
    );
    if (!user.email) throw 'NOT_SIGN_IN';
    const data = yield call(api.updateUser, { location });
    yield put(actions.setUserSuccess(data));
  } catch (e) {
    yield put(actions.setUserFailure(e.response));
    yield put(actions.updateLocal({ location }));
  }
}

export default function* root() {
  yield takeEvery(actions.GET_USER, getUser);
  yield takeEvery(actions.AUTO_SIGNIN, autoSignIn);
  yield takeEvery(actions.SIGNIN, signIn);
  yield takeEvery(actions.SIGNUP, signUp);
  yield takeEvery(actions.SIGNOUT, signOut);
  yield takeEvery(actions.TERMINATE, terminate);
  yield takeEvery(actions.CREATE_META, createMeta);
  yield takeEvery(actions.FORGOT_PASSWORD, forgotPassword);
  yield takeEvery(actions.CHANGE_PASSWORD, changePassword);
  yield takeEvery(actions.UPDATE_LOCATION, updateLocation);
}
