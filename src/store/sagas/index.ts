import { all, fork } from 'redux-saga/effects';
import userRoot from './user';
import dogRoot from './dog';

export default function* root() {
  yield all([fork(userRoot), fork(dogRoot)]);
}
