import { combineReducers } from 'redux';
import user, { UserState } from './user';

export interface ReducerState {
  readonly user: UserState;
}

export default combineReducers({ user } as any);
