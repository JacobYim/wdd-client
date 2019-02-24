import { select, put, takeEvery } from 'redux-saga/effects';

import { ReducerState } from 'src/store/reducers';
import * as actions from 'src/store/actions/walk';

// HELPERS
const getWalk = (state: ReducerState) => state.walk;

// SAGAS
function* updateStatus(action: ReturnType<typeof actions.updateStatus>) {
  try {
    yield put(actions.setWalkRequest());
    const { status: prevStatus }: ReturnType<typeof getWalk> = yield select(
      getWalk
    );
    const status = action.payload;
    const payload = { status } as ReducerState['walk'];
    if (prevStatus === 'READY' && status === 'WALKING')
      payload.createdAt = new Date();
    yield put(actions.setWalkSuccess(payload));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

function* pushPin(action: ReturnType<typeof actions.pushPin>) {
  try {
    const { speed, addDistance, latitude, longitude, type } = action.payload;
    yield put(actions.setWalkRequest());
    const { distance, pins }: ReturnType<typeof getWalk> = yield select(
      getWalk
    );
    pins.push({ latitude, longitude, type });
    const updateData = {
      speed: speed || 0,
      distance: distance + addDistance,
      pins,
    };
    yield put(actions.setWalkSuccess(updateData));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

export default function* root() {
  yield takeEvery(actions.UPDATE_STATUS, updateStatus);
  yield takeEvery(actions.PUSH_PIN, pushPin);
}
