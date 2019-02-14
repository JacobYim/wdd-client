import { select, put, takeEvery } from 'redux-saga/effects';

import { ReducerState } from 'src/store/reducers';
import * as actions from 'src/store/actions/walk';

// HELPERS
const getWalk = (state: ReducerState) => state.walk;

// SAGAS
function* updateStatus(action: ReturnType<typeof actions.updateStatus>) {
  try {
    yield put(actions.setWalkRequest());
    const walk: ReturnType<typeof getWalk> = yield select(getWalk);
    walk.status = action.payload;
    yield put(actions.setWalkSuccess(walk));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

function* updateTime(action: ReturnType<typeof actions.updateTime>) {
  try {
    yield put(actions.setWalkRequest());
    const walk: ReturnType<typeof getWalk> = yield select(getWalk);
    walk.info = { ...walk.info, ...action.payload };
    yield put(actions.setWalkSuccess(walk));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

function* updatePin(action: ReturnType<typeof actions.updatePin>) {
  try {
    yield put(actions.setWalkRequest());
    const walk: ReturnType<typeof getWalk> = yield select(getWalk);
    // TODO: handle updating distance due to pinpoint
    yield put(actions.setWalkSuccess(walk));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

export default function* root() {
  yield takeEvery(actions.UPDATE_STATUS, updateStatus);
  yield takeEvery(actions.UPDATE_TIME, updateTime);
  yield takeEvery(actions.UPDATE_PIN, updatePin);
}
