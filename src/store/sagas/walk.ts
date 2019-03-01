import { put, select, takeEvery } from 'redux-saga/effects';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';

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
    switch (status) {
      case 'READY':
        yield put(actions.clearWalk());
        break;
      case 'WALKING':
        if (prevStatus === 'READY') payload.createdAt = new Date();
      default:
        yield put(actions.setWalkSuccess(payload));
        break;
    }
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

function* pushPin(action: ReturnType<typeof actions.pushPin>) {
  try {
    const { speed, addDistance, latitude, longitude } = action.payload;
    yield put(actions.setWalkRequest());
    const { distance, pins }: ReturnType<typeof getWalk> = yield select(
      getWalk
    );
    const updateData = {
      speed: speed || 0,
      distance: distance + addDistance,
      pins: [...pins, { latitude, longitude }],
    };
    yield put(actions.setWalkSuccess(updateData));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

function* updateLatestPin(action: ReturnType<typeof actions.updateLatestPin>) {
  try {
    const type = action.payload;
    yield put(actions.setWalkRequest());
    const { pins }: ReturnType<typeof getWalk> = yield select(getWalk);
    pins[pins.length - 1].type = type;
    yield put(actions.setWalkSuccess({ pins }));
  } catch (e) {
    yield put(actions.setWalkFailure(e));
  }
}

export default function* root() {
  yield takeEvery(actions.UPDATE_STATUS, updateStatus);
  yield takeEvery(actions.PUSH_PIN, pushPin);
  yield takeEvery(actions.UPDATE_LATEST_PIN, updateLatestPin);
}
