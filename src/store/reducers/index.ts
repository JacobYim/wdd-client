import { combineReducers } from 'redux';
import user, { UserState } from './user';
import walk, { WalkState } from './walk';

export interface ReducerState {
  readonly user: UserState;
  readonly walk: WalkState;
}

export default combineReducers({ user, walk } as any);
