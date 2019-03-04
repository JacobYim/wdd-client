import { all, fork } from 'redux-saga/effects';
import dogRoot from './dog';
import userRoot from './user';
import walkRoot from './walk';

export default function* root() {
  yield all([fork(userRoot), fork(dogRoot), fork(walkRoot)]);
}
