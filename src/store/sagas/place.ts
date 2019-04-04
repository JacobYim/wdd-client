import { findIndex } from 'lodash';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as api from 'src/services/api/place';
import * as actions from 'src/store/actions/place';
import { ReducerState } from 'src/store/reducers';

const getUser = (state: ReducerState) => state.user;

function* scrapPlace(action: ReturnType<typeof actions.scrap>) {
  try {
    yield put(actions.setPlaceRequest());
    const data: actions.PlaceResponse = yield call(api.scrap, action.payload);
    const { places }: ReturnType<typeof getUser> = yield select(getUser);
    places.push(data._id);
    yield put(actions.setPlaceSuccess(places));
  } catch (e) {
    yield put(actions.setPlaceFailure(e.response));
  }
}

function* unScrapPlace(action: ReturnType<typeof actions.scrap>) {
  try {
    yield put(actions.setPlaceRequest());
    const data: actions.PlaceResponse = yield call(api.unScrap, action.payload);
    const { places }: ReturnType<typeof getUser> = yield select(getUser);
    places.splice(findIndex(places, place => place === data._id), 1);
    yield put(actions.setPlaceSuccess(places));
  } catch (e) {
    yield put(actions.setPlaceFailure(e.response));
  }
}

export default function* root() {
  yield takeEvery(actions.SCRAP, scrapPlace);
  yield takeEvery(actions.UN_SCRAP, unScrapPlace);
}
